import type { CLICommand } from "../../../types/global";
import { ApolloAPI } from "../api";

const api = new ApolloAPI();

export const sequenceCommands: CLICommand[] = [
  {
    name: "sequences:list",
    description: "List all email sequences",
    usage: "sequences:list [--page 1] [--per_page 25]",
    category: "Email Sequences",
    handler: async (args) => {
      const params: any = {};
      if (args.page) params.page = parseInt(args.page);
      if (args.per_page) params.per_page = parseInt(args.per_page);

      const data = await api.getEmailSequences(params);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "sequences:get",
    description: "Get details of a specific email sequence",
    usage: "sequences:get --id <sequence_id>",
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id (sequence ID)");
      }

      const data = await api.getEmailSequence(args.id);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "sequences:create",
    description: "Create a new email sequence",
    usage: 'sequences:create --name "My Sequence" --email_account_id <id> [--description "Description"]',
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.name || !args.email_account_id) {
        throw new Error("Required: --name and --email_account_id");
      }

      const sequenceData: any = {
        name: args.name,
        email_account_id: args.email_account_id,
      };

      if (args.description) sequenceData.description = args.description;
      if (args.active !== undefined) sequenceData.active = args.active === "true";

      const data = await api.createEmailSequence(sequenceData);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "sequences:update",
    description: "Update an email sequence",
    usage: 'sequences:update --id <sequence_id> [--name "New Name"] [--description "New Description"]',
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id (sequence ID)");
      }

      const updateData: any = {};
      if (args.name) updateData.name = args.name;
      if (args.description) updateData.description = args.description;
      if (args.active !== undefined) updateData.active = args.active === "true";

      const data = await api.updateEmailSequence(args.id, updateData);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "sequences:delete",
    description: "Delete an email sequence",
    usage: "sequences:delete --id <sequence_id>",
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id (sequence ID)");
      }

      const _data = await api.deleteEmailSequence(args.id);
      console.log("Sequence deleted successfully");
    },
  },
  {
    name: "sequences:duplicate",
    description: "Duplicate an email sequence",
    usage: 'sequences:duplicate --id <sequence_id> [--name "Copy of Original"]',
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id (sequence ID)");
      }

      const duplicateData: any = {};
      if (args.name) duplicateData.name = args.name;

      const data = await api.duplicateEmailSequence(args.id, duplicateData);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "sequences:stats",
    description: "Get sequence performance statistics",
    usage: 'sequences:stats --id <sequence_id> [--date_range "last_30_days"]',
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id (sequence ID)");
      }

      const params: any = {};
      if (args.date_range) params.date_range = args.date_range;

      const data = await api.getSequenceStats(args.id, params);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "sequences:analytics",
    description: "Get detailed sequence analytics",
    usage: 'sequences:analytics --id <sequence_id> [--granularity "day"]',
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id (sequence ID)");
      }

      const params: any = {};
      if (args.granularity) params.granularity = args.granularity;

      const data = await api.getSequenceAnalytics(args.id, params);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "sequences:steps:list",
    description: "List steps in a sequence",
    usage: "sequences:steps:list --sequence_id <sequence_id>",
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.sequence_id) {
        throw new Error("Required: --sequence_id");
      }

      const data = await api.getSequenceSteps(args.sequence_id);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "sequences:steps:create",
    description: "Create a new step in a sequence",
    usage:
      'sequences:steps:create --sequence_id <id> --type "email" --wait_time_days 3 --subject "Subject" --body "Body"',
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.sequence_id || !args.type) {
        throw new Error("Required: --sequence_id and --type");
      }

      const stepData: any = {
        type: args.type,
        wait_time_days: parseInt(args.wait_time_days) || 1,
      };

      if (args.subject) stepData.subject = args.subject;
      if (args.body) stepData.body = args.body;
      if (args.template_id) stepData.template_id = args.template_id;

      const data = await api.createSequenceStep(args.sequence_id, stepData);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "sequences:steps:update",
    description: "Update a sequence step",
    usage: 'sequences:steps:update --sequence_id <id> --step_id <id> [--subject "New Subject"]',
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.sequence_id || !args.step_id) {
        throw new Error("Required: --sequence_id and --step_id");
      }

      const updateData: any = {};
      if (args.subject) updateData.subject = args.subject;
      if (args.body) updateData.body = args.body;
      if (args.wait_time_days) updateData.wait_time_days = parseInt(args.wait_time_days);

      const data = await api.updateSequenceStep(args.sequence_id, args.step_id, updateData);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "sequences:steps:delete",
    description: "Delete a sequence step",
    usage: "sequences:steps:delete --sequence_id <id> --step_id <id>",
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.sequence_id || !args.step_id) {
        throw new Error("Required: --sequence_id and --step_id");
      }

      const _data = await api.deleteSequenceStep(args.sequence_id, args.step_id);
      console.log("Step deleted successfully");
    },
  },
  {
    name: "sequences:contacts:add",
    description: "Add contacts to a sequence",
    usage:
      'sequences:contacts:add --sequence_id <id> --contacts \'[{"email":"person@example.com","first_name":"John","last_name":"Doe"}]\'',
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.sequence_id || !args.contacts) {
        throw new Error("Required: --sequence_id and --contacts (JSON array)");
      }

      let contactsData;
      try {
        contactsData = JSON.parse(args.contacts);
      } catch (_error) {
        throw new Error("Invalid JSON format for --contacts parameter");
      }

      const data = await api.addContactsToSequence(args.sequence_id, { contacts: contactsData });
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "sequences:contacts:list",
    description: "List contacts in a sequence",
    usage: "sequences:contacts:list --sequence_id <id> [--page 1] [--per_page 25]",
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.sequence_id) {
        throw new Error("Required: --sequence_id");
      }

      const params: any = {};
      if (args.page) params.page = parseInt(args.page);
      if (args.per_page) params.per_page = parseInt(args.per_page);

      const data = await api.getSequenceContacts(args.sequence_id, params);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "sequences:contacts:remove",
    description: "Remove a contact from a sequence",
    usage: "sequences:contacts:remove --sequence_id <id> --contact_id <id>",
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.sequence_id || !args.contact_id) {
        throw new Error("Required: --sequence_id and --contact_id");
      }

      const _data = await api.removeContactFromSequence(args.sequence_id, args.contact_id);
      console.log("Contact removed from sequence");
    },
  },
  {
    name: "sequences:contacts:pause",
    description: "Pause a contact in a sequence",
    usage: "sequences:contacts:pause --sequence_id <id> --contact_id <id>",
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.sequence_id || !args.contact_id) {
        throw new Error("Required: --sequence_id and --contact_id");
      }

      const _data = await api.pauseSequenceContact(args.sequence_id, args.contact_id);
      console.log("Contact paused in sequence");
    },
  },
  {
    name: "sequences:contacts:resume",
    description: "Resume a contact in a sequence",
    usage: "sequences:contacts:resume --sequence_id <id> --contact_id <id>",
    category: "Email Sequences",
    handler: async (args) => {
      if (!args.sequence_id || !args.contact_id) {
        throw new Error("Required: --sequence_id and --contact_id");
      }

      const _data = await api.resumeSequenceContact(args.sequence_id, args.contact_id);
      console.log("Contact resumed in sequence");
    },
  },
];

// Aliases for common commands
export const sequenceAliases: CLICommand[] = [
  { ...sequenceCommands[0], name: "seq:list" },
  { ...sequenceCommands[1], name: "seq:get" },
  { ...sequenceCommands[2], name: "seq:create" },
  { ...sequenceCommands[3], name: "seq:update" },
  { ...sequenceCommands[4], name: "seq:delete" },
  { ...sequenceCommands[5], name: "seq:duplicate" },
  { ...sequenceCommands[6], name: "seq:stats" },
  { ...sequenceCommands[7], name: "seq:analytics" },
];
