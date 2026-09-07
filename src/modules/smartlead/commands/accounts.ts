import type { CLICommand } from "../../../types/global";
import { SmartLeadAPI } from "../api";

const api = new SmartLeadAPI();

export const accountCommands: CLICommand[] = [
  {
    name: "accounts:list",
    description: "📋 List all connected email accounts",
    usage: "accounts:list [--status active] [--provider gmail] [--limit 100] [--offset 0]",
    category: "📧 Email Accounts",
    handler: async (args) => {
      const params = {
        offset: args.offset || 0,
        limit: args.limit || 100,
        ...(args.status && { status: args.status }),
        ...(args.provider && { provider: args.provider }),
      };
      const data = await api.getEmailAccounts(params);
      console.log("📧 Email Accounts:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "accounts:get",
    description: "🔍 Get specific email account details",
    usage: "accounts:get --id account_id",
    category: "📧 Email Accounts",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.getEmailAccount(args.id);
      console.log("📧 Account Details:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "accounts:add",
    description: "➕ Connect new email account",
    usage:
      'accounts:add --from_name "John Doe" --from_email "person@example.com" --username "person@example.com" --password "pass" --smtp_host "smtp.gmail.com" --smtp_port 465 --imap_host "imap.gmail.com" --imap_port 993 --max_email_per_day 100',
    category: "📧 Email Accounts",
    handler: async (args) => {
      if (!args.from_email || !args.from_name) throw new Error("Required: --from_email, --from_name");

      const accountData = {
        id: null, // null for new account
        from_name: args.from_name,
        from_email: args.from_email,
        user_name: args.username || args.from_email,
        password: args.password,
        smtp_host: args.smtp_host || "smtp.gmail.com",
        smtp_port: args.smtp_port || 465,
        imap_host: args.imap_host || "imap.gmail.com",
        imap_port: args.imap_port || 993,
        max_email_per_day: args.max_email_per_day || 100,
        custom_tracking_url: args.custom_tracking_url || "",
        bcc: args.bcc || "",
        signature: args.signature || "",
        warmup_enabled: args.warmup_enabled === "true" || false,
      };

      const data = await api.createEmailAccount(accountData);
      console.log("✅ Email account added successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "accounts:update",
    description: "✏️ Update email account settings",
    usage:
      "accounts:update --id account_id --max_email_per_day 150 [--custom_tracking_url url] [--bcc email] [--signature text]",
    category: "📧 Email Accounts",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");

      const updateData = {
        max_email_per_day: args.max_email_per_day ? parseInt(args.max_email_per_day) : undefined,
        custom_tracking_url: args.custom_tracking_url,
        bcc: args.bcc,
        signature: args.signature,
        time_to_wait_in_mins: args.time_to_wait_in_mins ? parseInt(args.time_to_wait_in_mins) : undefined,
      };

      // Remove undefined values
      Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

      const data = await api.updateEmailAccount(args.id, updateData);
      console.log("✅ Account updated successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "accounts:delete",
    description: "🗑️ Remove email account",
    usage: "accounts:delete --id account_id",
    category: "📧 Email Accounts",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      await api.deleteEmailAccount(args.id);
      console.log("✅ Email account removed successfully");
    },
  },
  {
    name: "accounts:test",
    description: "🧪 Test email account connectivity",
    usage: "accounts:test --id account_id",
    category: "📧 Email Accounts",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      console.log("🧪 Testing account connectivity...");
      try {
        const data = await api.testEmailAccountConnection(args.id);
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
    usage:
      "accounts:warmup-start --id account_id [--total_warmup_per_day 35] [--daily_rampup 2] [--reply_rate_percentage 38]",
    category: "📧 Email Accounts",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");

      const warmupData = {
        warmup_enabled: true,
        total_warmup_per_day: args.total_warmup_per_day ? parseInt(args.total_warmup_per_day) : 35,
        daily_rampup: args.daily_rampup ? parseInt(args.daily_rampup) : 2,
        reply_rate_percentage: args.reply_rate_percentage ? parseInt(args.reply_rate_percentage) : 38,
        warmup_key_id: args.warmup_key_id || undefined,
      };

      const data = await api.updateEmailAccountWarmup(args.id, warmupData);
      console.log("🔥 Warmup started successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "accounts:warmup-stop",
    description: "⏹️ Stop email warmup process",
    usage: "accounts:warmup-stop --id account_id",
    category: "📧 Email Accounts",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.updateEmailAccountWarmup(args.id, { warmup_enabled: false });
      console.log("⏹️ Warmup stopped successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "accounts:warmup-stats",
    description: "📊 Get warmup statistics",
    usage: "accounts:warmup-stats --id account_id",
    category: "📧 Email Accounts",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.getEmailAccountWarmupStats(args.id);
      console.log("📊 Warmup Statistics:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "accounts:reconnect-failed",
    description: "🔄 Reconnect all failed email accounts",
    usage: "accounts:reconnect-failed",
    category: "📧 Email Accounts",
    handler: async () => {
      console.log("🔄 Reconnecting failed email accounts...");
      console.log("⚠️ Note: This can only be used 3 times per day");
      try {
        const data = await api.reconnectFailedEmailAccounts();
        console.log("✅ Reconnection process started!");
        console.log(JSON.stringify(data, null, 2));
      } catch (error) {
        console.error("❌ Reconnection failed:", error.message);
      }
    },
  },
  {
    name: "accounts:health",
    description: "🏥 Check account health and deliverability",
    usage: "accounts:health --id account_id",
    category: "📧 Email Accounts",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.getEmailAccount(args.id);
      console.log("🏥 Account Health Report:");
      console.log(`  📧 Email: ${data.from_email}`);
      console.log(`  📊 Daily Sent: ${data.daily_sent_count}`);
      console.log(`  📈 Daily Limit: ${data.message_per_day}`);
      console.log(`  ✅ SMTP Status: ${data.is_smtp_success ? "✅ Connected" : "❌ Failed"}`);
      console.log(`  📥 IMAP Status: ${data.is_imap_success ? "✅ Connected" : "❌ Failed"}`);
      console.log(`  🔥 Warmup: ${data.warmup_details ? "✅ Active" : "❌ Inactive"}`);

      if (data.warmup_details) {
        console.log(`  📊 Warmup Reputation: ${data.warmup_details.warmup_reputation}`);
        console.log(`  📧 Total Sent: ${data.warmup_details.total_sent_count}`);
        console.log(`  ⚠️ Spam Count: ${data.warmup_details.total_spam_count}`);
      }

      if (data.smtp_failure_error) {
        console.log(`  ❌ SMTP Error: ${data.smtp_failure_error}`);
      }
      if (data.imap_failure_error) {
        console.log(`  ❌ IMAP Error: ${data.imap_failure_error}`);
      }
    },
  },
  {
    name: "accounts:limits",
    description: "📈 View and update daily sending limits",
    usage: "accounts:limits --id account_id [--daily_limit 100]",
    category: "📧 Email Accounts",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");

      if (args.daily_limit) {
        const updateData = { max_email_per_day: parseInt(args.daily_limit) };
        await api.updateEmailAccount(args.id, updateData);
        console.log(`📈 Daily limit updated to ${args.daily_limit} for account ${args.id}`);
      }

      const data = await api.getEmailAccount(args.id);
      console.log("📊 Sending Limits:");
      console.log(`  📧 Email: ${data.from_email}`);
      console.log(`  📈 Daily Limit: ${data.message_per_day}`);
      console.log(`  📊 Sent Today: ${data.daily_sent_count}`);
      console.log(`  📈 Remaining: ${data.message_per_day - data.daily_sent_count}`);
    },
  },
  {
    name: "accounts:tracking-domain",
    description: "🔗 Manage custom tracking domain",
    usage: "accounts:tracking-domain --id account_id [--domain tracking.mydomain.com]",
    category: "📧 Email Accounts",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");

      if (args.domain) {
        const updateData = { custom_tracking_url: `https://${args.domain}` };
        await api.updateEmailAccount(args.id, updateData);
        console.log(`🔗 Custom tracking domain set to: ${args.domain}`);
      }

      const data = await api.getEmailAccount(args.id);
      console.log("🔗 Tracking Domain Settings:");
      console.log(`  📧 Email: ${data.from_email}`);
      console.log(`  🔗 Custom Domain: ${data.custom_tracking_domain || "Not set"}`);
    },
  },
  {
    name: "accounts:signature",
    description: "✍️ Manage email signature",
    usage: 'accounts:signature --id account_id [--signature "Best regards,\\nJohn Doe"]',
    category: "📧 Email Accounts",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");

      if (args.signature) {
        const updateData = { signature: args.signature };
        await api.updateEmailAccount(args.id, updateData);
        console.log("✍️ Email signature updated successfully!");
      }

      const data = await api.getEmailAccount(args.id);
      console.log("✍️ Email Signature:");
      console.log(`  📧 Email: ${data.from_email}`);
      console.log(`  ✍️ Signature: ${data.signature || "Not set"}`);
    },
  },
  {
    name: "accounts:bcc",
    description: "📧 Manage BCC settings",
    usage: "accounts:bcc --id account_id [--bcc_email person@example.com]",
    category: "📧 Email Accounts",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");

      if (args.bcc_email) {
        const updateData = { bcc: args.bcc_email };
        await api.updateEmailAccount(args.id, updateData);
        console.log(`📧 BCC email set to: ${args.bcc_email}`);
      }

      const data = await api.getEmailAccount(args.id);
      console.log("📧 BCC Settings:");
      console.log(`  📧 Email: ${data.from_email}`);
      console.log(`  📧 BCC: ${data.bcc_email || "Not set"}`);
    },
  },
  {
    name: "accounts:provider-stats",
    description: "📊 View stats by email provider",
    usage: "accounts:provider-stats",
    category: "📧 Email Accounts",
    handler: async () => {
      const data = await api.getEmailAccounts();
      const stats = data.reduce(
        (acc: Record<string, { count: number; active: number; failed: number }>, account: any) => {
          const provider = account.type || "Unknown";
          if (!acc[provider]) {
            acc[provider] = { count: 0, active: 0, failed: 0 };
          }
          acc[provider].count++;
          if (account.is_smtp_success && account.is_imap_success) {
            acc[provider].active++;
          } else {
            acc[provider].failed++;
          }
          return acc;
        },
        {},
      );

      console.log("📊 Email Accounts by Provider:");
      Object.entries(stats).forEach(
        ([provider, providerData]: [string, { count: number; active: number; failed: number }]) => {
          console.log(`  📧 ${provider}:`);
          console.log(`    📊 Total: ${providerData.count}`);
          console.log(`    ✅ Active: ${providerData.active}`);
          console.log(`    ❌ Failed: ${providerData.failed}`);
          console.log("");
        },
      );
    },
  },
];

// Account command aliases
export const accountAliases: CLICommand[] = [
  { ...accountCommands[0], name: "a:list", description: "📋 List accounts (alias)" },
  { ...accountCommands[1], name: "a:get", description: "🔍 Get account (alias)" },
  { ...accountCommands[2], name: "a:add", description: "➕ Add account (alias)" },
  { ...accountCommands[5], name: "a:test", description: "🧪 Test account (alias)" },
  { ...accountCommands[6], name: "a:warmup", description: "🔥 Start warmup (alias)" },
  { ...accountCommands[7], name: "a:stop-warmup", description: "⏹️ Stop warmup (alias)" },
  { ...accountCommands[8], name: "a:stats", description: "📊 Warmup stats (alias)" },
  { ...accountCommands[10], name: "a:health", description: "🏥 Account health (alias)" },
];
