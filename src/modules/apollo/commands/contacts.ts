import type { CLICommand } from "../../../types/global";
import { ApolloAPI } from "../api";

const api = new ApolloAPI();

export const contactCommands: CLICommand[] = [
  {
    name: "contacts:list",
    description: "List all contacts",
    usage: 'contacts:list [--page 1] [--per_page 25] [--q "search term"]',
    category: "Contacts",
    handler: async (args) => {
      const params: any = {};
      if (args.page) params.page = parseInt(args.page);
      if (args.per_page) params.per_page = parseInt(args.per_page);
      if (args.q) params.q = args.q;

      const data = await api.getContacts(params);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "contacts:get",
    description: "Get details of a specific contact",
    usage: "contacts:get --id <contact_id>",
    category: "Contacts",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id (contact ID)");
      }

      const data = await api.getContact(args.id);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "contacts:create",
    description: "Create a new contact",
    usage: 'contacts:create --email person@example.com --first_name John --last_name Doe [--company "Company Name"]',
    category: "Contacts",
    handler: async (args) => {
      if (!args.email) {
        throw new Error("Required: --email");
      }

      const contactData: any = {
        email: args.email,
      };

      if (args.first_name) contactData.first_name = args.first_name;
      if (args.last_name) contactData.last_name = args.last_name;
      if (args.company) contactData.organization_name = args.company;
      if (args.title) contactData.title = args.title;
      if (args.phone) contactData.phone = args.phone;
      if (args.linkedin_url) contactData.linkedin_url = args.linkedin_url;

      const data = await api.createContact(contactData);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "contacts:update",
    description: "Update a contact",
    usage: 'contacts:update --id <contact_id> [--first_name "New Name"] [--title "New Title"]',
    category: "Contacts",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id (contact ID)");
      }

      const updateData: any = {};
      if (args.first_name) updateData.first_name = args.first_name;
      if (args.last_name) updateData.last_name = args.last_name;
      if (args.email) updateData.email = args.email;
      if (args.company) updateData.organization_name = args.company;
      if (args.title) updateData.title = args.title;
      if (args.phone) updateData.phone = args.phone;
      if (args.linkedin_url) updateData.linkedin_url = args.linkedin_url;

      const data = await api.updateContact(args.id, updateData);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "contacts:delete",
    description: "Delete a contact",
    usage: "contacts:delete --id <contact_id>",
    category: "Contacts",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("Required: --id (contact ID)");
      }

      const _data = await api.deleteContact(args.id);
      console.log("Contact deleted successfully");
    },
  },
];

export const contactAliases: CLICommand[] = [
  { ...contactCommands[0], name: "contacts:ls" },
  { ...contactCommands[2], name: "contacts:add" },
  { ...contactCommands[4], name: "contacts:rm" },
];
