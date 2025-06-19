#!/usr/bin/env node

import { configCommands } from "./core/commands/config";
import { executeCommand, listCommands, openPlatformShell, runCommandByName, showHelp } from "./core/index";
import { getAvailableModules, initializePlatforms, listModules, performHealthCheck } from "./core/module-selector";
import { getTheme, showError } from "./core/utils/theme";
import { CLIError } from "./types/global";

async function showInteractiveMenu() {
  const theme = getTheme("default");

  console.log(theme.primary("\n❄️ Cold Email CLI v2.0.0 - Interactive Mode\n"));

  const modules = getAvailableModules();

  console.log("🚀 Quick Access:");
  console.log("  Type a platform name to enter its shell:");
  modules.forEach((module, index) => {
    const status = module.info.status === "active" ? "✅" : "❌";
    console.log(`  ${index + 1}. ${theme.primary(module.name)} ${status} (${module.info.totalCommands} commands)`);
  });

  console.log(theme.secondary("\n🔧 Global Commands:"));
  console.log("  platforms   - List all platforms");
  console.log("  health      - Check platform health");
  console.log("  search      - Search commands across all platforms");
  console.log("  config:list - Show configuration status");
  console.log("  config:set  - Configure platform API keys");
  console.log("  discord     - Join our Discord community");
  console.log("  help        - Show detailed help");

  console.log(theme.accent("\n💡 Tips:"));
  console.log("• Type platform name directly: smartlead, instantly, apollo, etc.");
  console.log("• Use exec for direct commands: exec smartlead campaigns:list");
  console.log("• Configure APIs: config:set smartlead apiKey your_key");
  console.log("• Press Ctrl+C to exit\n");
}

async function searchCommands(query?: string) {
  await initializePlatforms();
  const { getAllCommands } = await import("./core/module-selector");

  if (!query) {
    console.log("Usage: cec search <query>");
    console.log("Example: cec search campaign");
    return;
  }

  const allCommands = getAllCommands();

  // Add config commands to search
  const allCommandsWithConfig = [...allCommands, ...configCommands];

  const results = allCommandsWithConfig.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase()),
  );

  const theme = getTheme("default");

  console.log(theme.primary(`\n🔍 Search Results for "${query}":\n`));

  if (results.length === 0) {
    console.log(theme.error("No commands found matching your query."));
    return;
  }

  // Group by platform
  const groupedResults: Record<string, typeof results> = {};
  results.forEach((cmd) => {
    // Extract platform from command name or category
    const platform = cmd.name.includes("config:") ? "global" : cmd.name.split(":")[0] || "unknown";
    if (!groupedResults[platform]) {
      groupedResults[platform] = [];
    }
    groupedResults[platform].push(cmd);
  });

  Object.entries(groupedResults).forEach(([platform, commands]) => {
    console.log(theme.accent(`📦 ${platform.toUpperCase()}:`));
    commands.slice(0, 5).forEach((cmd) => {
      console.log(`  ${theme.primary(cmd.name)} - ${cmd.description}`);
    });
    if (commands.length > 5) {
      console.log(theme.secondary(`  ... and ${commands.length - 5} more`));
    }
    console.log("");
  });

  console.log(
    theme.secondary(`Found ${results.length} total commands across ${Object.keys(groupedResults).length} platforms`),
  );
  console.log("💡 Use 'exec <platform> <command>' to run a command directly");
  console.log("💡 Use 'config:set <platform> <key> <value>' for configuration");
}

async function executeConfigCommand(command: string, args: string[]) {
  const configCommand = configCommands.find((cmd) => cmd.name === command);
  if (!configCommand) {
    showError(`Config command "${command}" not found`);
    return;
  }

  // Parse args into object
  const parsedArgs: Record<string, any> = {};

  // Handle positional arguments for config commands
  if (command === "config:set" && args.length >= 3) {
    parsedArgs.platform = args[0];
    parsedArgs.key = args[1];
    parsedArgs.value = args[2];
  } else if (command === "config:get" && args.length >= 1) {
    parsedArgs.platform = args[0];
    if (args.length >= 2) parsedArgs.key = args[1];
  } else if (command === "config:clear" && args.length >= 1) {
    parsedArgs.platform = args[0];
  } else if (command === "config:validate" && args.length >= 1) {
    parsedArgs.platform = args[0];
  }

  try {
    await configCommand.handler(parsedArgs);
  } catch (error: any) {
    showError(error.message);
  }
}

async function main() {
  try {
    // Initialize platforms on startup
    await initializePlatforms();

    const args = process.argv.slice(2);

    // No arguments - show interactive menu
    if (args.length === 0) {
      await showInteractiveMenu();
      return;
    }

    const command = args[0];

    // Handle global commands first
    switch (command) {
      case "--help":
      case "-h":
      case "help":
        await showHelp();
        break;

      case "platforms":
      case "list":
        listModules();
        break;

      case "health":
      case "status":
        await performHealthCheck();
        break;

      case "search":
      case "find":
        await searchCommands(args[1]);
        break;

      case "discord":
        console.log("🚀 Join our Discord community: https://discord.gg/coldemail");
        break;

      case "config:list":
      case "config:set":
      case "config:get":
      case "config:clear":
      case "config:validate":
      case "config:env-example":
        await executeConfigCommand(command, args.slice(1));
        break;

      case "exec":
      case "run": {
        if (args.length < 3) {
          showError("Usage: cec exec <platform> <command> --args '{...}'");
          console.log("Example: cec exec smartlead campaigns:list --args '{\"limit\":10}'");
          return;
        }

        const platformName = args[1];
        const commandName = args[2];

        // Parse --args parameter
        let commandArgs = {};
        const argsIndex = args.indexOf("--args");
        if (argsIndex !== -1 && args[argsIndex + 1]) {
          try {
            commandArgs = JSON.parse(args[argsIndex + 1]);
          } catch (error) {
            showError("Invalid JSON in --args parameter");
            console.log('Example: --args \'{"limit":10,"status":"active"}\'');
            return;
          }
        }

        await executeCommand(platformName, commandName, commandArgs);
        break;
      }

      case "interactive":
      case "menu":
        await showInteractiveMenu();
        break;

      default: {
        // Check if it's a platform name
        const modules = getAvailableModules();
        const platform = modules.find((m) => m.name.toLowerCase() === command.toLowerCase());

        if (platform) {
          // Open platform shell
          await openPlatformShell(command.toLowerCase());
        } else {
          // Unknown command
          const theme = getTheme("default");
          console.log(theme.error(`❌ Unknown command: ${command}\n`));
          console.log("Available platforms:");
          modules.forEach((module) => {
            console.log(`  • ${module.name.toLowerCase()}`);
          });
          console.log("\nAvailable commands:");
          console.log("  • platforms, health, search, discord, help");
          console.log("  • config:list, config:set, config:validate");
          console.log("  • exec <platform> <command>");
          console.log("\nTry 'cec help' for more information.");
        }
        break;
      }
    }
  } catch (error: any) {
    if (error instanceof CLIError) {
      showError(`${error.code}: ${error.message}`);
      if (error.platform) {
        console.log(`Platform: ${error.platform}`);
      }
      if (error.command) {
        console.log(`Command: ${error.command}`);
      }
    } else {
      showError(`Unexpected error: ${error.message}`);
    }
    process.exit(1);
  }
}

// Run the CLI
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
