# 🚀 Instantly CLI Guide

## Overview
Instantly integration for the Cold Email CLI provides comprehensive access to 68 commands across multiple categories.

## Quick Start

### Authentication
```bash
export INSTANTLY_API_KEY="your_api_key_here"
```

### Launch Interactive Shell
```bash
bun run instantly
# or
bun run src/cli.ts instantly
```

## Command Categories

### Available Commands
The Instantly platform provides 68 total commands organized into logical categories:

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
bun run instantly campaigns:list

# Create new campaign
bun run instantly campaigns:create --name "Q1 Outreach"

# Get analytics
bun run instantly analytics:overview
```

### Advanced Features
```bash
# Bulk operations
bun run instantly leads:bulk-add --campaign_id 123 --file leads.csv

# Template management
bun run instantly templates:create --name "Follow-up" --subject "Quick follow-up"

# Account warmup
bun run instantly accounts:warmup-start --email person@example.com
```

## API Integration

### MCP Configuration
For AI assistant integration, use the MCP configuration:

```json
{
  "mcpServers": {
    "instantly": {
      "command": "bun",
      "args": ["run", "src/cli.ts", "instantly"],
      "env": {
        "INSTANTLY_API_KEY": "${INSTANTLY_API_KEY}"
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

**🚀 Instantly - Professional email automation at your fingertips**
