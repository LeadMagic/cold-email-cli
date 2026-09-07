import type { CLICommand } from "../../../types/global";
import { EmailBisonAPI } from "../api";

const api = new EmailBisonAPI();

export const accountCommands: CLICommand[] = [
  {
    name: "accounts:list",
    description: "List all connected email accounts",
    usage: "accounts:list",
    category: "Power Email Accounts",
    handler: async (_args) => {
      const data = await api.getEmailAccounts();
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "accounts:add",
    description: "Connect new email account with power settings",
    usage: "accounts:add --email person@example.com --provider gmail [--power-warmup true]",
    category: "Power Email Accounts",
    handler: async (args) => {
      if (!args.email) {
        throw new Error("Required: --email");
      }
      if (!args.provider) {
        throw new Error("Required: --provider");
      }

      const accountData: any = {
        email: args.email,
        provider: args.provider,
      };

      if (args["smtp-settings"]) {
        try {
          accountData.smtp_settings = JSON.parse(args["smtp-settings"]);
        } catch {
          throw new Error("Invalid JSON for --smtp-settings");
        }
      }
      if (args["power-warmup"]) accountData.power_warmup = args["power-warmup"] === "true";

      const data = await api.addEmailAccount(accountData);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "accounts:power-warmup",
    description: "Start advanced power warmup for email account",
    usage: "accounts:power-warmup --email person@example.com [--settings '{\"daily_increase\": 5}']",
    category: "Power Email Accounts",
    handler: async (args) => {
      if (!args.email) {
        throw new Error("Required: --email");
      }

      let settings: Record<string, any> | undefined;
      if (args.settings) {
        try {
          settings = JSON.parse(args.settings);
        } catch {
          throw new Error("Invalid JSON for --settings");
        }
      }

      const data = await api.powerWarmupAccount(args.email, settings);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "accounts:health",
    description: "Check email account health and deliverability",
    usage: "accounts:health --email person@example.com",
    category: "Power Email Accounts",
    handler: async (args) => {
      if (!args.email) {
        throw new Error("Required: --email");
      }

      const data = await api.getAccountHealth(args.email);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "accounts:rotate",
    description: "Rotate email accounts for campaign",
    usage: "accounts:rotate --campaign-id campaign_id [--strategy round-robin]",
    category: "Power Email Accounts",
    handler: async (args) => {
      if (!args["campaign-id"]) {
        throw new Error("Required: --campaign-id");
      }

      const data = await api.rotateAccounts(args["campaign-id"], args.strategy);
      console.log(JSON.stringify(data, null, 2));
    },
  },
];

export const accountAliases: CLICommand[] = [
  { ...accountCommands[0], name: "a:list" },
  { ...accountCommands[1], name: "a:add" },
  { ...accountCommands[2], name: "a:warmup" },
  { ...accountCommands[3], name: "a:health" },
  { ...accountCommands[4], name: "a:rotate" },
];
