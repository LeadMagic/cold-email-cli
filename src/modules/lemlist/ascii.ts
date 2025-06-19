import { getTheme } from "../../core/utils/theme";

const theme = getTheme("lemlist");

export const lemlistAscii = theme.primary(`
   ██╗     ███████╗███╗   ███╗██╗     ██╗███████╗████████╗
   ██║     ██╔════╝████╗ ████║██║     ██║██╔════╝╚══██╔══╝
   ██║     █████╗  ██╔████╔██║██║     ██║███████╗   ██║   
   ██║     ██╔══╝  ██║╚██╔╝██║██║     ██║╚════██║   ██║   
   ███████╗███████╗██║ ╚═╝ ██║███████╗██║███████║   ██║   
   ╚══════╝╚══════╝╚═╝     ╚═╝╚══════╝╚═╝╚══════╝   ╚═╝   
`) + theme.secondary(`
              🎨 Creative Email Outreach & Automation Platform 🎨
`);

export const lemlistBanner = theme.gradient(`
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                        💖 LEMLIST CREATIVE STUDIO 💖                       │
  └─────────────────────────────────────────────────────────────────────────────┘
`); 