import type { CLICommand } from "../../../types/global";
import { QuickMailAPI } from "../api";

const api = new QuickMailAPI();

export const templateCommands: CLICommand[] = [
  {
    name: "templates:list",
    description: "📋 List all email templates",
    usage: "templates:list [--page 1] [--per_page 20]",
    category: "📄 Template Management",
    handler: async (args) => {
      const params = {
        page: args.page ? parseInt(args.page) : 1,
        per_page: args.per_page ? parseInt(args.per_page) : 20,
      };
      const data = await api.getTemplates(params);
      console.log("📄 QuickMail Templates:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "templates:create",
    description: "➕ Create new email template",
    usage:
      'templates:create --name "Template Name" --subject "Email Subject" --body "Email body content" [--category "outreach"]',
    category: "📄 Template Management",
    handler: async (args) => {
      if (!args.name || !args.subject || !args.body) {
        throw new Error("Required: --name, --subject, --body");
      }

      const templateData = {
        name: args.name,
        subject: args.subject,
        body: args.body,
        category: args.category || "general",
      };

      const data = await api.createTemplate(templateData);
      console.log("✅ Template created successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "templates:get",
    description: "🔍 Get template details",
    usage: "templates:get --id template_id",
    category: "📄 Template Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      const data = await api.getTemplate(args.id);
      console.log("🔍 Template Details:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "templates:update",
    description: "✏️ Update template content",
    usage: 'templates:update --id template_id [--name "New Name"] [--subject "New Subject"] [--body "New content"]',
    category: "📄 Template Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");

      const updateData = {
        ...(args.name && { name: args.name }),
        ...(args.subject && { subject: args.subject }),
        ...(args.body && { body: args.body }),
        ...(args.category && { category: args.category }),
      };

      const data = await api.updateTemplate(args.id, updateData);
      console.log("✅ Template updated successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "templates:delete",
    description: "🗑️ Delete template",
    usage: "templates:delete --id template_id",
    category: "📄 Template Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");
      await api.deleteTemplate(args.id);
      console.log("✅ Template deleted successfully!");
    },
  },
  {
    name: "templates:clone",
    description: "🔄 Clone existing template",
    usage: 'templates:clone --id template_id --name "Cloned Template"',
    category: "📄 Template Management",
    handler: async (args) => {
      if (!args.id || !args.name) throw new Error("Required: --id, --name");

      // Get the original template
      const original = await api.getTemplate(args.id);

      // Create a copy with the new name
      const clonedData = {
        name: args.name,
        subject: original.subject,
        body: original.body,
        category: original.category || "general",
      };

      const data = await api.createTemplate(clonedData);
      console.log("🔄 Template cloned successfully!");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "templates:variables",
    description: "📝 List available template variables",
    usage: "templates:variables",
    category: "📄 Template Management",
    handler: async () => {
      const variables = [
        "{{first_name}}",
        "{{last_name}}",
        "{{full_name}}",
        "{{email}}",
        "{{company}}",
        "{{position}}",
        "{{phone}}",
        "{{website}}",
        "{{linkedin}}",
        "{{custom_field_1}}",
        "{{custom_field_2}}",
        "{{custom_field_3}}",
        "{{unsubscribe_link}}",
        "{{sender_name}}",
        "{{sender_email}}",
      ];

      console.log("📝 Available Template Variables:");
      variables.forEach((variable) => {
        console.log(`  ${variable}`);
      });

      console.log("\n💡 Usage Tips:");
      console.log("  • Variables are case-sensitive");
      console.log("  • Use double curly braces: {{variable_name}}");
      console.log("  • Custom fields can be used for personalization");
      console.log("  • Always include {{unsubscribe_link}} for compliance");
    },
  },
  {
    name: "templates:preview",
    description: "👁️ Preview template with sample data",
    usage: 'templates:preview --id template_id [--sample_data \'{"first_name":"John","company":"ACME"}\']',
    category: "📄 Template Management",
    handler: async (args) => {
      if (!args.id) throw new Error("Required: --id");

      const template = await api.getTemplate(args.id);

      // Use provided sample data or defaults
      let sampleData = {
        first_name: "John",
        last_name: "Doe",
        full_name: "John Doe",
        email: "john@example.com",
        company: "Example Corp",
        position: "CEO",
        phone: "+1-555-0123",
        website: "https://example.com",
        linkedin: "https://linkedin.com/in/johndoe",
        custom_field_1: "Sample Value 1",
        custom_field_2: "Sample Value 2",
        custom_field_3: "Sample Value 3",
        unsubscribe_link: "https://example.com/unsubscribe",
        sender_name: "Your Name",
        sender_email: "person@example.com",
      };

      if (args.sample_data) {
        try {
          const customData = JSON.parse(args.sample_data);
          sampleData = { ...sampleData, ...customData };
        } catch (error) {
          console.log("⚠️ Invalid sample data JSON, using defaults");
        }
      }

      // Simple template rendering (replace variables)
      let renderedSubject = template.subject;
      let renderedBody = template.body;

      Object.entries(sampleData).forEach(([key, value]) => {
        const placeholder = `{{${key}}}`;
        renderedSubject = renderedSubject.replace(new RegExp(placeholder, "g"), value);
        renderedBody = renderedBody.replace(new RegExp(placeholder, "g"), value);
      });

      console.log("👁️ Template Preview:");
      console.log("=".repeat(50));
      console.log(`📧 Subject: ${renderedSubject}`);
      console.log("=".repeat(50));
      console.log(`📝 Body:\n${renderedBody}`);
      console.log("=".repeat(50));
    },
  },
];

// Template command aliases
export const templateAliases: CLICommand[] = [
  { ...templateCommands[0], name: "tpl:list", description: "📋 List templates (alias)" },
  { ...templateCommands[1], name: "tpl:create", description: "➕ Create template (alias)" },
  { ...templateCommands[2], name: "tpl:get", description: "🔍 Get template (alias)" },
  { ...templateCommands[3], name: "tpl:update", description: "✏️ Update template (alias)" },
  { ...templateCommands[4], name: "tpl:delete", description: "🗑️ Delete template (alias)" },
  { ...templateCommands[5], name: "tpl:clone", description: "🔄 Clone template (alias)" },
  { ...templateCommands[7], name: "tpl:preview", description: "👁️ Preview template (alias)" },
];
