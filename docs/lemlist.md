# 💖 lemlist CLI Guide

## Overview
lemlist integration for the Cold Email CLI provides comprehensive access to 33 commands across multiple categories.

## Quick Start

### Authentication
```bash
export LEMLIST_API_KEY="your_api_key_here"
```

### Launch Interactive Shell
```bash
bun run lemlist
# or
bun run src/cli.ts lemlist
```

## Command Categories

### Available Commands
The lemlist platform provides 33 total commands organized into logical categories:

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
bun run lemlist campaigns:list

# Create new campaign
bun run lemlist campaigns:create --name "Q1 Outreach"

# Get analytics
bun run lemlist analytics:overview
```

### Advanced Features
```bash
# Bulk operations
bun run lemlist leads:bulk-add --campaign_id 123 --file leads.csv

# Template management
bun run lemlist templates:create --name "Follow-up" --subject "Quick follow-up"

# Account warmup
bun run lemlist accounts:warmup-start --email person@example.com
```

## API Integration

### MCP Configuration
For AI assistant integration, use the MCP configuration:

```json
{
  "mcpServers": {
    "lemlist": {
      "command": "bun",
      "args": ["run", "src/cli.ts", "lemlist"],
      "env": {
        "LEMLIST_API_KEY": "${LEMLIST_API_KEY}"
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

**💖 lemlist - Professional email automation at your fingertips**
