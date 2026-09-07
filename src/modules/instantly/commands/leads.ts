import type { CLICommand } from "../../../types/global";
import { InstantlyAPI } from "../api";

const api = new InstantlyAPI();

export const leadCommands: CLICommand[] = [
  {
    name: "leads:add-bulk",
    description: "📊 Add multiple leads to campaign",
    usage: "leads:add-bulk --campaign_id id --leads leads.json",
    category: "🎯 Lead Management",
    handler: async (args) => {
      if (!args.campaign_id || !args.leads) {
        throw new Error("Required: --campaign_id, --leads");
      }

      let leads: any[];
      try {
        leads = JSON.parse(args.leads);
      } catch (error) {
        throw new Error("Invalid JSON format for leads");
      }

      const data = await api.addLeads(leads);
      console.log("✅ Leads added successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leads:list",
    description: "📋 List leads with filters",
    usage: "leads:list [--campaign_id id] [--limit 100] [--status active]",
    category: "🎯 Lead Management",
    handler: async (args) => {
      const params = {
        ...(args.campaign_id && { campaign_id: args.campaign_id }),
        limit: args.limit || 100,
        ...(args.status && { status: args.status }),
      };
      const data = await api.getLeads(params);
      console.log("📋 Leads:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leads:status",
    description: "🔍 Get lead status information",
    usage: "leads:status --id lead_id",
    category: "🎯 Lead Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      console.log("🔍 Getting lead status...");
      console.log("🚧 Use leads:list with filters to check lead status");
    },
  },
  {
    name: "leads:verify",
    description: "✅ Verify lead email addresses",
    usage: "leads:verify --email person@example.com",
    category: "🎯 Lead Management",
    handler: async (args) => {
      if (!args.email) throw new Error("Required: --email");
      const data = await api.verifyEmail(args.email);
      console.log("✅ Email verification result:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leads:update",
    description: "✏️ Update lead information",
    usage: "leads:update --id lead_id --status interested",
    category: "🎯 Lead Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const updateData = {
        ...(args.status && { status: args.status }),
        ...(args.first_name && { first_name: args.first_name }),
        ...(args.last_name && { last_name: args.last_name }),
        ...(args.email && { email: args.email }),
        ...(args.company && { company: args.company }),
      };
      const data = await api.updateLead(args.id, updateData);
      console.log("✅ Lead updated successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leads:delete",
    description: "🗑️ Remove lead",
    usage: "leads:delete --id lead_id",
    category: "🎯 Lead Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      await api.deleteLead(args.id);
      console.log("✅ Lead deleted successfully");
    },
  },
  {
    name: "leads:interest-status",
    description: "💡 Update lead interest status",
    usage: "leads:interest-status --id lead_id --interest_status interested",
    category: "🎯 Lead Management",
    handler: async (args) => {
      if (!args.id || !args.interest_status) {
        throw new Error("Required: --id, --interest_status");
      }
      const data = await api.updateLeadInterestStatus({
        lead_id: args.id,
        interest_status: args.interest_status,
      });
      console.log("✅ Interest status updated!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leads:merge",
    description: "🔄 Merge duplicate leads",
    usage: "leads:merge --primary_id id1 --duplicate_id id2",
    category: "🎯 Lead Management",
    handler: async (args) => {
      if (!args.primary_id || !args.duplicate_id) {
        throw new Error("Required: --primary_id, --duplicate_id");
      }
      const data = await api.mergeLeads({
        primary_lead_id: args.primary_id,
        duplicate_lead_id: args.duplicate_id,
      });
      console.log("✅ Leads merged successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "leads:lists",
    description: "📝 Manage lead lists",
    usage: "leads:lists --action list|create|update|delete [--id list_id] [--name 'List Name']",
    category: "🎯 Lead Management",
    handler: async (args) => {
      switch (args.action) {
        case "create": {
          if (!args.name) throw new Error("Required for create: --name");
          const createData = await api.createLeadList({ name: args.name });
          console.log("✅ Lead list created!");
          console.log(JSON.stringify(createData, null, 2));
          break;
        }

        case "update": {
          if (!args.id || !args.name) throw new Error("Required for update: --id, --name");
          const updateData = await api.updateLeadList(args.id, { name: args.name });
          console.log("✅ Lead list updated!");
          console.log(JSON.stringify(updateData, null, 2));
          break;
        }

        case "delete":
          if (!args.id) throw new Error("Required for delete: --id");
          await api.deleteLeadList(args.id);
          console.log("✅ Lead list deleted!");
          break;

        default: {
          const data = await api.getLeadLists();
          console.log("📝 Lead Lists:");
          console.log(JSON.stringify(data, null, 2));
        }
      }
    },
  },
  {
    name: "leads:verification-result",
    description: "📊 Get email verification result",
    usage: "leads:verification-result --email person@example.com",
    category: "🎯 Lead Management",
    handler: async (args) => {
      if (!args.email) throw new Error("Required: --email");
      const data = await api.getEmailVerificationResult(args.email);
      console.log("📊 Verification Result:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
];

// Lead command aliases
export const leadAliases: CLICommand[] = [
  { ...leadCommands[0], name: "l:bulk", description: "📊 Add bulk leads (alias)" },
  { ...leadCommands[1], name: "l:list", description: "📋 List leads (alias)" },
  { ...leadCommands[4], name: "l:update", description: "✏️ Update lead (alias)" },
  { ...leadCommands[5], name: "l:delete", description: "🗑️ Delete lead (alias)" },
  { ...leadCommands[3], name: "l:verify", description: "✅ Verify lead (alias)" },
];
