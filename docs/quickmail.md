# 🌊 QuickMail CLI Guide

## Overview
QuickMail integration for the Cold Email CLI provides comprehensive access to 90 commands across multiple categories.

## Quick Start

### Authentication
```bash
export QUICKMAIL_API_KEY="your_api_key_here"
```

### Launch Interactive Shell
```bash
bun run quickmail
# or
bun run src/cli.ts quickmail
```

## Command Categories

### Available Commands
The QuickMail platform provides 90 total commands organized into logical categories:

- **Campaign Management** - Create, manage, and optimize campaigns
- **Contact/Lead Management** - Import, organize, and manage prospects
- **Email Account Management** - Configure and monitor email accounts
- **Analytics & Reporting** - Track performance and generate insights
- **Template Management** - Create and manage email templates
- **Automation & Sequences** - Build automated email workflows

## Usage Examples

### Basic Operations
```bash
# List campaigns
bun run quickmail campaigns:list

# Create new campaign
bun run quickmail campaigns:create --name "Q1 Outreach"

# Get analytics
bun run quickmail analytics:overview
```

### Advanced Features
```bash
# Bulk operations
bun run quickmail leads:bulk-add --campaign_id 123 --file leads.csv

# Template management
bun run quickmail templates:create --name "Follow-up" --subject "Quick follow-up"

# Account warmup
bun run quickmail accounts:warmup-start --email sales@company.com
```

## API Integration

### MCP Configuration
For AI assistant integration, use the MCP configuration:

```json
{
  "mcpServers": {
    "quickmail": {
      "command": "bun",
      "args": ["run", "src/cli.ts", "quickmail"],
      "env": {
        "QUICKMAIL_API_KEY": "${QUICKMAIL_API_KEY}"
      }
    }
  }
}
```

## Best Practices

1. **Authentication**: Always set your API key before using commands
2. **Interactive Shell**: Use the shell for exploration and discovery
3. **Bulk Operations**: Leverage bulk commands for efficiency
4. **Analytics**: Regular monitoring for campaign optimization
5. **Templates**: Reuse templates for consistency

## Troubleshooting

### Common Issues
- **Authentication Error**: Verify API key is correctly set
- **Rate Limiting**: Use appropriate delays between bulk operations
- **Invalid Parameters**: Check command usage with `--help`

### Support
- GitHub Issues: [Report bugs](https://github.com/jesseouellette/cold-email-cli/issues)
- Discord: [Join community](https://discord.gg/mB76X5QJ)

---

**🌊 QuickMail - Professional email automation at your fingertips**
