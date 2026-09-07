import type { CLICommand } from "../../../types/global";
import { QuickMailAPI } from "../api";

const api = new QuickMailAPI();

export const accountCommands: CLICommand[] = [
  {
    name: "accounts:list",
    description: "📋 List all email accounts",
    usage: "accounts:list",
    category: "📧 Email Account Management",
    handler: async () => {
      const data = await api.getEmailAccounts();
      console.log("📧 QuickMail Email Accounts:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "accounts:create",
    description: "➕ Add new email account",
    usage:
      'accounts:create --email "person@example.com" --password "password" --smtp_host "smtp.gmail.com" --smtp_port 465 --imap_host "imap.gmail.com" --imap_port 993',
    category: "📧 Email Account Management",
    handler: async (args) => {
      if (!args.email || !args.password || !args.smtp_host || !args.smtp_port || !args.imap_host || !args.imap_port) {
        throw new Error("Required: --email, --password, --smtp_host, --smtp_port, --imap_host, --imap_port");
      }

      const accountData = {
        email: args.email,
        password: args.password,
        smtp_host: args.smtp_host,
        smtp_port: parseInt(args.smtp_port),
        imap_host: args.imap_host,
        imap_port: parseInt(args.imap_port),
        use_ssl: args.use_ssl !== "false",
      };

      const data = await api.createEmailAccount(accountData);
      console.log("✅ Email account added successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "accounts:get",
    description: "🔍 Get email account details",
    usage: "accounts:get --id account_id",
    category: "📧 Email Account Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.getEmailAccount(args.id);
      console.log("🔍 Email Account Details:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "accounts:update",
    description: "✏️ Update email account settings",
    usage: "accounts:update --id account_id [--smtp_host new_host] [--smtp_port 587]",
    category: "📧 Email Account Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");

      const updateData = {
        ...(args.email && { email: args.email }),
        ...(args.password && { password: args.password }),
        ...(args.smtp_host && { smtp_host: args.smtp_host }),
        ...(args.smtp_port && { smtp_port: parseInt(args.smtp_port) }),
        ...(args.imap_host && { imap_host: args.imap_host }),
        ...(args.imap_port && { imap_port: parseInt(args.imap_port) }),
        ...(args.use_ssl && { use_ssl: args.use_ssl === "true" }),
      };

      const data = await api.updateEmailAccount(args.id, updateData);
      console.log("✅ Email account updated successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "accounts:delete",
    description: "🗑️ Remove email account",
    usage: "accounts:delete --id account_id",
    category: "📧 Email Account Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      await api.deleteEmailAccount(args.id);
      console.log("✅ Email account removed successfully!");
    },
  },
  {
    name: "accounts:test",
    description: "🧪 Test email account connection",
    usage: "accounts:test --id account_id",
    category: "📧 Email Account Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      console.log("🧪 Testing email account connection...");

      try {
        const data = await api.testEmailAccount(args.id);
        console.log("✅ Connection test successful!");
        console.log(JSON.stringify(data, null, 2));
      } catch (error) {
        console.error("❌ Connection test failed:", error.message);
      }
    },
  },
  {
    name: "accounts:warmup-start",
    description: "🔥 Start email warmup process",
    usage: "accounts:warmup-start --id account_id [--daily_limit 30] [--increment_rate 5] [--reply_rate 25]",
    category: "📧 Email Account Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");

      const config = {
        daily_limit: args.daily_limit ? parseInt(args.daily_limit) : 30,
        increment_rate: args.increment_rate ? parseInt(args.increment_rate) : 5,
        reply_rate: args.reply_rate ? parseInt(args.reply_rate) : 25,
      };

      const data = await api.startWarmup(args.id, config);
      console.log("🔥 Email warmup started successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "accounts:warmup-stop",
    description: "⏹️ Stop email warmup process",
    usage: "accounts:warmup-stop --id account_id",
    category: "📧 Email Account Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.stopWarmup(args.id);
      console.log("⏹️ Email warmup stopped successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "accounts:warmup-stats",
    description: "📊 Get warmup statistics",
    usage: "accounts:warmup-stats --id account_id",
    category: "📧 Email Account Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.getWarmupStats(args.id);
      console.log("📊 Warmup Statistics:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "accounts:deliverability",
    description: "📈 Check deliverability metrics",
    usage: "accounts:deliverability [--id account_id]",
    category: "📧 Email Account Management",
    handler: async (args) => {
      const data = await api.getDeliverabilityStats(args.id);
      console.log("📈 Deliverability Statistics:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
];

// Account command aliases
export const accountAliases: CLICommand[] = [
  { ...accountCommands[0], name: "acc:list", description: "📋 List accounts (alias)" },
  { ...accountCommands[1], name: "acc:create", description: "➕ Create account (alias)" },
  { ...accountCommands[2], name: "acc:get", description: "🔍 Get account (alias)" },
  { ...accountCommands[3], name: "acc:update", description: "✏️ Update account (alias)" },
  { ...accountCommands[4], name: "acc:delete", description: "🗑️ Delete account (alias)" },
  { ...accountCommands[5], name: "acc:test", description: "🧪 Test account (alias)" },
  { ...accountCommands[6], name: "acc:warmup", description: "🔥 Start warmup (alias)" },
  { ...accountCommands[7], name: "acc:stop-warmup", description: "⏹️ Stop warmup (alias)" },
  { ...accountCommands[8], name: "acc:warmup-stats", description: "📊 Warmup stats (alias)" },
];
