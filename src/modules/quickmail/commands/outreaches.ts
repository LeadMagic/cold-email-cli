import type { CLICommand } from "../../../types/global";
import { QuickMailAPI } from "../api";

const api = new QuickMailAPI();

export const outreachCommands: CLICommand[] = [
  {
    name: "outreaches:list",
    description: "📋 List all outreach sequences",
    usage: "outreaches:list [--page 1] [--per_page 20]",
    category: "🔄 Outreach Sequences",
    handler: async (args) => {
      const params = {
        page: args.page ? parseInt(args.page) : 1,
        per_page: args.per_page ? parseInt(args.per_page) : 20,
      };
      const data = await api.getOutreaches(params);
      console.log("🔄 QuickMail Outreach Sequences:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "outreaches:create",
    description: "➕ Create new outreach sequence",
    usage:
      'outreaches:create --name "Sequence Name" --subject "Email Subject" --body "Email body" --from_name "John" --from_email "person@example.com"',
    category: "🔄 Outreach Sequences",
    handler: async (args) => {
      if (!args.name || !args.subject || !args.body || !args.from_name || !args.from_email) {
        throw new Error("Required: --name, --subject, --body, --from_name, --from_email");
      }

      const outreachData = {
        name: args.name,
        subject: args.subject,
        body: args.body,
        from_name: args.from_name,
        from_email: args.from_email,
        delay_days: args.delay_days ? parseInt(args.delay_days) : 0,
      };

      const data = await api.createOutreach(outreachData);
      console.log("✅ Outreach sequence created successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "outreaches:get",
    description: "🔍 Get outreach sequence details",
    usage: "outreaches:get --id outreach_id",
    category: "🔄 Outreach Sequences",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.getOutreach(args.id);
      console.log("🔍 Outreach Sequence Details:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "outreaches:update",
    description: "✏️ Update outreach sequence",
    usage: 'outreaches:update --id outreach_id [--name "New Name"] [--subject "New Subject"]',
    category: "🔄 Outreach Sequences",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");

      const updateData = {
        ...(args.name && { name: args.name }),
        ...(args.subject && { subject: args.subject }),
        ...(args.body && { body: args.body }),
        ...(args.from_name && { from_name: args.from_name }),
        ...(args.from_email && { from_email: args.from_email }),
        ...(args.delay_days && { delay_days: parseInt(args.delay_days) }),
      };

      const data = await api.updateOutreach(args.id, updateData);
      console.log("✅ Outreach sequence updated successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "outreaches:delete",
    description: "🗑️ Delete outreach sequence",
    usage: "outreaches:delete --id outreach_id",
    category: "🔄 Outreach Sequences",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      await api.deleteOutreach(args.id);
      console.log("✅ Outreach sequence deleted successfully!");
    },
  },
  {
    name: "outreaches:clone",
    description: "🔄 Clone outreach sequence",
    usage: 'outreaches:clone --id outreach_id --name "Cloned Sequence"',
    category: "🔄 Outreach Sequences",
    handler: async (args) => {
      if (!args.id || !args.name) throw new Error("Required: --id, --name");

      // Get the original outreach
      const original = await api.getOutreach(args.id);

      // Create a copy with the new name
      const clonedData = {
        name: args.name,
        subject: original.subject,
        body: original.body,
        from_name: original.from_name,
        from_email: original.from_email,
        delay_days: original.delay_days || 0,
      };

      const data = await api.createOutreach(clonedData);
      console.log("🔄 Outreach sequence cloned successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
];

// Outreach command aliases
export const outreachAliases: CLICommand[] = [
  { ...outreachCommands[0], name: "out:list", description: "📋 List outreaches (alias)" },
  { ...outreachCommands[1], name: "out:create", description: "➕ Create outreach (alias)" },
  { ...outreachCommands[2], name: "out:get", description: "🔍 Get outreach (alias)" },
  { ...outreachCommands[3], name: "out:update", description: "✏️ Update outreach (alias)" },
  { ...outreachCommands[4], name: "out:delete", description: "🗑️ Delete outreach (alias)" },
  { ...outreachCommands[5], name: "out:clone", description: "🔄 Clone outreach (alias)" },
];
