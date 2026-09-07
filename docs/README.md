# 🚀 Professional Cold Email CLI

A comprehensive command-line interface for managing cold email outreach campaigns across multiple professional platforms. Built for sales teams, marketing agencies, and growth hackers who need powerful automation tools.

## ⚡ Platform Support

| Platform | Status | Commands | Focus Area |
|----------|---------|----------|------------|
| **SmartLead** | ✅ Available | 82+ | Scale, Analytics, Infrastructure |
| **Instantly** | ✅ Available | 35+ | Volume, Deliverability, Automation |  
| **SalesForge** | ✅ Available | 82+ | AI, Multi-Channel, Personalization |

**Total: 200+ Commands** across all cold email platforms.

## 📋 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Platform Modules](#platform-modules)
- [Command Categories](#command-categories)
- [Configuration](#configuration)
- [Usage Examples](#usage-examples)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## ✨ Features

### 🎯 Multi-Platform Support
- **SmartLead Integration**: Advanced campaign management, analytics, and infrastructure scaling
- **Instantly Integration**: High-volume automation with focus on deliverability optimization  
- **SalesForge Integration**: AI-powered personalization with multi-channel sequences

### 🔧 Advanced Functionality
- **Campaign Management**: Create, manage, and optimize cold email campaigns
- **Lead Operations**: Import, segment, and manage prospect databases
- **Email Account Management**: Connect and monitor multiple sending domains
- **Analytics & Reporting**: Comprehensive performance tracking and insights
- **Deliverability Tools**: Monitor reputation, warmup accounts, and avoid spam filters
- **Sequence Automation**: Build complex multi-step outreach workflows
- **Team Collaboration**: Manage team members and permissions

### 💻 Developer Experience
- **Interactive CLI**: User-friendly command interface with auto-completion
- **Modular Architecture**: Clean separation between platform integrations
- **TypeScript Support**: Full type safety and IntelliSense support
- **Comprehensive Testing**: 90%+ test coverage with Jest
- **Professional Documentation**: Detailed API docs and usage examples

## 🚀 Installation

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**
- **API Keys** for your chosen cold email platform(s)

### Install Globally
```bash
npm install -g professional-cold-email-cli
```

### Install Locally  
```bash
git clone https://github.com/your-org/cold-email-cli.git
cd cold-email-cli
npm install
npm run build
npm link
```

## ⚡ Quick Start

### 1. Launch the CLI
```bash
cold-email-cli
```

### 2. Select Your Platform
Choose from SmartLead, Instantly, or SalesForge based on your needs.

### 3. Configure API Access
```bash
# Inside the CLI
config set --api-key YOUR_API_KEY
```

### 4. Start Building Campaigns
```bash
# Create a new campaign
campaigns:create --name "Q1 Outreach" --type email

# Import leads 
leads:import --file prospects.csv --campaign cam_12345

# Launch campaign
campaigns:start --id cam_12345
```

## 🏗️ Platform Modules

### SmartLead Module (82 Commands)
**Focus**: Scale, Analytics, Infrastructure

**Key Features**:
- Advanced campaign analytics and reporting
- Sophisticated lead scoring and segmentation  
- Email infrastructure management
- A/B testing and optimization
- Team collaboration tools

**Popular Commands**:
```bash
# Campaign Management
campaigns:create --name "Enterprise Outreach" --type multi-sequence
campaigns:analytics --id cam_12345 --metrics detailed
campaigns:split-test --variants subject,sender --ratio 50:50

# Lead Operations  
leads:score --criteria "title,company_size,industry"
leads:segment --rules "company_size>500,title contains 'VP'"
leads:enrich --fields "phone,linkedin,company_info"

# Analytics & Reporting
analytics:dashboard --date-range 30d --format executive
analytics:cohort --segment enterprise --metric reply-rate
analytics:forecast --model advanced --horizon 90d
```

### Instantly Module (35 Commands)  
**Focus**: Volume, Deliverability, Automation

**Key Features**:
- High-volume email sending capabilities
- Advanced deliverability optimization
- Automated warmup and reputation management
- Smart sending algorithms
- Compliance and safety features

**Popular Commands**:
```bash
# Volume Management
campaigns:launch --volume high --daily-limit 1000
accounts:warmup --strategy aggressive --duration 30d
accounts:rotate --algorithm smart --health-check

# Deliverability 
deliverability:check --domain company.com --full-audit
deliverability:optimize --auto-fix --recommendations
spam:test --content template_01 --providers all

# Automation
sequences:create --steps 7 --intervals smart
sequences:personalize --ai-level advanced --variables dynamic
automation:triggers --conditions "opened,not-replied" --action follow-up
```

### SalesForge Module (82 Commands)
**Focus**: AI, Multi-Channel, Personalization

**Key Features**:
- AI-powered email personalization
- Multi-channel outreach (Email + LinkedIn + Phone)
- Advanced conversation intelligence
- Dynamic content generation
- Social selling integration

**Popular Commands**:
```bash
# AI-Powered Personalization
ai:personalize --level advanced --data-sources "linkedin,company,news"
ai:generate --type subject-lines --tone professional --count 10
ai:optimize --campaign cam_12345 --metric reply-rate --auto-improve

# Multi-Channel Sequences
sequences:multi-channel --channels "email,linkedin,phone"
linkedin:connect --strategy warm --message-template personal
phone:schedule --time-zone auto --call-script consultative

# Intelligence & Analytics
conversation:analyze --sentiment --intent --next-best-action
lead:intelligence --sources "social,web,news" --real-time
pipeline:forecast --ai-model advanced --confidence 95
```

## 📊 Command Categories

### Campaign Management
- **Create & Configure**: Set up new cold email campaigns with advanced settings
- **Launch & Monitor**: Start campaigns and track real-time performance  
- **Optimize & Scale**: A/B test and improve campaign performance
- **Schedule & Automate**: Set up automated sending and follow-ups

### Lead Management  
- **Import & Export**: Handle large prospect databases efficiently
- **Segment & Score**: Create targeted prospect groups
- **Enrich & Validate**: Enhance lead data quality
- **Track & Manage**: Monitor lead status and engagement

### Email Account Management
- **Connect & Verify**: Link sending domains and email accounts
- **Warmup & Monitor**: Maintain sender reputation
- **Rotate & Scale**: Manage multiple sending accounts
- **Secure & Comply**: Ensure compliance and security

### Analytics & Reporting
- **Performance Metrics**: Track opens, replies, conversions
- **Deliverability Insights**: Monitor sender reputation and placement
- **Comparative Analysis**: Compare campaigns and timeframes  
- **Custom Dashboards**: Build executive and operational reports

### Sequence Management
- **Design & Build**: Create multi-step outreach sequences
- **Personalize & Optimize**: Add dynamic content and AI personalization
- **Test & Iterate**: A/B test sequence performance
- **Scale & Automate**: Deploy across large prospect lists

### Team & Collaboration
- **User Management**: Add team members and set permissions
- **Workspace Setup**: Configure team environments
- **Performance Tracking**: Monitor team metrics and goals
- **Training & Support**: Access documentation and training

## ⚙️ Configuration

### Environment Setup
```bash
# Set default platform
export COLD_EMAIL_PLATFORM=smartlead

# Set API credentials
export SMARTLEAD_API_KEY=your_smartlead_key
export INSTANTLY_API_KEY=your_instantly_key  
export SALESFORGE_API_KEY=your_salesforge_key
```

### Configuration File
Create `~/.cold-email-cli/config.json`:
```json
{
  "defaultPlatform": "smartlead",
  "platforms": {
    "smartlead": {
      "apiKey": "your_api_key",
      "baseUrl": "https://server.smartlead.ai",
      "defaultCampaignSettings": {
        "dailyLimit": 50,
        "timezone": "America/New_York"
      }
    },
    "instantly": {
      "apiKey": "your_api_key", 
      "baseUrl": "https://api.instantly.ai",
      "defaultSettings": {
        "warmupEnabled": true,
        "deliverabilityMode": "high"
      }
    },
    "salesforge": {
      "apiKey": "your_api_key",
      "baseUrl": "https://api.salesforge.ai", 
      "defaultSettings": {
        "aiPersonalization": true,
        "multiChannel": true
      }
    }
  }
}
```

### Platform-Specific Configuration

#### SmartLead Configuration
```bash
# Configure SmartLead settings
config:smartlead --api-key YOUR_KEY --webhook-url https://your-domain.com/webhooks
config:smartlead --daily-limit 100 --timezone "America/New_York"
config:smartlead --tracking --unsubscribe-url https://your-domain.com/unsubscribe
```

#### Instantly Configuration  
```bash
# Configure Instantly settings
config:instantly --api-key YOUR_KEY --warmup-enabled true
config:instantly --deliverability-mode high --daily-volume 500
config:instantly --spam-protection enabled --compliance strict
```

#### SalesForge Configuration
```bash
# Configure SalesForge settings  
config:salesforge --api-key YOUR_KEY --ai-level advanced
config:salesforge --multi-channel email,linkedin --personalization-data company,linkedin,news
config:salesforge --conversation-intelligence enabled --auto-optimization true
```

## 📚 Usage Examples

### Complete Campaign Workflow

#### 1. Campaign Setup
```bash
# Switch to SmartLead for advanced analytics
switch

# Create new campaign
campaigns:create \
  --name "Enterprise SaaS Q1" \
  --type email \
  --vertical "B2B SaaS" \
  --goal "demo_bookings"

# Configure campaign settings  
campaigns:configure \
  --id cam_12345 \
  --daily-limit 50 \
  --sending-hours "9-17" \
  --timezone "America/New_York"
```

#### 2. Lead Management
```bash
# Import lead list
leads:import \
  --file enterprise_prospects.csv \
  --campaign cam_12345 \
  --dedupe true \
  --validate-emails true

# Segment high-value prospects
leads:segment \
  --name "Enterprise Tier" \
  --criteria "employees>500,revenue>10M" \
  --campaign cam_12345

# Enrich lead data
leads:enrich \
  --segment seg_enterprise \
  --fields "phone,linkedin,company_news,funding" \
  --provider clearbit
```

#### 3. Sequence Creation
```bash
# Create multi-step sequence
sequences:create \
  --name "Enterprise Outreach Sequence" \
  --campaign cam_12345 \
  --steps 5 \
  --intervals "1,3,7,14,21"

# Add personalized templates
sequences:add-step \
  --sequence seq_12345 \
  --step 1 \
  --template "intro_enterprise" \
  --personalization "company,role,recent_funding"

# Set up follow-up automation
sequences:add-step \
  --sequence seq_12345 \
  --step 2 \
  --condition "opened,not-replied" \
  --template "follow_up_value" \
  --delay 3
```

#### 4. Email Account Setup
```bash
# Connect sending accounts
accounts:connect \
  --email person@example.com \
  --provider gmail \
  --daily-limit 30

accounts:connect \
  --email person@example.com \
  --provider outlook \
  --daily-limit 30

# Start warmup process
accounts:warmup-start \
  --accounts all \
  --strategy gradual \
  --duration 14d
```

#### 5. Launch & Monitor
```bash
# Final campaign review
campaigns:preview \
  --id cam_12345 \
  --test-leads 5 \
  --dry-run true

# Launch campaign
campaigns:start \
  --id cam_12345 \
  --confirm true

# Monitor real-time performance
campaigns:monitor \
  --id cam_12345 \
  --live true \
  --metrics "sent,delivered,opened,replied"
```

### Advanced Analytics Workflow

```bash
# Generate executive dashboard
analytics:dashboard \
  --campaigns cam_12345,cam_67890 \
  --date-range 30d \
  --format executive \
  --export pdf

# Deep-dive analysis
analytics:funnel \
  --campaign cam_12345 \
  --breakdown "segment,day_of_week,send_time" \
  --cohort enterprise

# Predictive analytics
analytics:forecast \
  --model advanced \
  --horizon 90d \
  --confidence 95 \
  --export csv

# Comparative analysis
analytics:compare \
  --campaigns cam_12345,cam_67890 \
  --metrics "reply_rate,conversion_rate,cost_per_lead" \
  --timeframe "month_over_month"
```

### Multi-Platform Workflow

```bash
# Use SmartLead for initial campaign setup and analytics
switch # Select SmartLead
campaigns:create --name "Multi-Platform Campaign"
analytics:benchmark --industry "B2B SaaS"

# Switch to Instantly for high-volume sending
switch # Select Instantly  
campaigns:sync --from-smartlead cam_12345
campaigns:launch --volume high --deliverability-mode aggressive

# Switch to SalesForge for AI personalization
switch # Select SalesForge
campaigns:sync --from-smartlead cam_12345
ai:personalize --level advanced --real-time true
sequences:multi-channel --channels "email,linkedin"
```

## 📖 API Documentation

### Command Structure
```bash
<module>:<category>:<action> [--options]
```

### Global Options
```bash
--help, -h          Show command help
--verbose, -v       Enable verbose output  
--format            Output format (json|table|csv)
--output, -o        Save output to file
--config            Specify config file path
--dry-run           Preview without executing
--confirm           Skip confirmation prompts
```

### Response Formats

#### JSON Response
```json
{
  "success": true,
  "data": {
    "campaignId": "cam_12345",
    "name": "Enterprise Outreach",
    "status": "active",
    "stats": {
      "sent": 1250,
      "delivered": 1198, 
      "opened": 359,
      "replied": 47
    }
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "executionTime": "1.2s"
  }
}
```

#### Table Response
```
┌─────────────┬──────────────────┬──────────┬───────┬───────────┬────────┬─────────┐
│ Campaign ID │ Name             │ Status   │ Sent  │ Delivered │ Opened │ Replied │
├─────────────┼──────────────────┼──────────┼───────┼───────────┼────────┼─────────┤
│ cam_12345   │ Enterprise       │ Active   │ 1,250 │ 1,198     │ 359    │ 47      │
│ cam_67890   │ Mid-Market       │ Paused   │ 2,100 │ 2,047     │ 612    │ 89      │
│ cam_54321   │ SMB Outreach     │ Complete │ 3,500 │ 3,360     │ 1,008  │ 203     │
└─────────────┴──────────────────┴──────────┴───────┴───────────┴────────┴─────────┘
```

### Error Handling
```json
{
  "success": false,
  "error": {
    "code": "INVALID_API_KEY",
    "message": "The provided API key is invalid or expired",
    "details": {
      "platform": "smartlead",
      "suggestion": "Check your API key in the platform dashboard"
    }
  }
}
```

## 🤝 Contributing

We welcome contributions from the cold email and sales automation community!

### Development Setup
```bash
# Clone the repository
git clone https://github.com/your-org/cold-email-cli.git
cd cold-email-cli

# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Adding New Platforms
1. Create new module in `src/modules/platform-name/`
2. Implement the `CLIModule` interface
3. Add TypeScript definitions in `types.ts`
4. Update module selector in `src/core/module-selector.ts`
5. Add tests and documentation

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Extended from recommended configs
- **Prettier**: Code formatting
- **Jest**: Testing framework
- **Conventional Commits**: Commit message format

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [https://docs.cold-email-cli.dev](https://docs.cold-email-cli.dev)
- **Issues**: [GitHub Issues](https://github.com/your-org/cold-email-cli/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/cold-email-cli/discussions)
- **Discord**: [Join our community](https://discord.gg/cold-email-cli)

## 🚀 Roadmap

### Upcoming Features
- **Additional Platforms**: Apollo, Outreach, SalesLoft integration
- **Advanced AI**: GPT-4 powered email generation and optimization
- **CRM Integration**: Salesforce, HubSpot, Pipedrive connectors
- **Advanced Analytics**: Predictive modeling and attribution analysis
- **Mobile App**: React Native companion app
- **Enterprise Features**: SSO, audit logs, advanced permissions

### Community Requests
- Email template marketplace
- Real-time collaboration features  
- Advanced automation workflows
- Integration with Zapier/Make
- Custom reporting and dashboards

---

**Built for the modern sales professional. Scale your cold outreach with confidence.** 