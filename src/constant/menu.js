import {
  Home,
  Box,
  DollarSign,
  UserPlus,
  Users,
  Chrome,
  Settings,
  Airplay,
  Slack,
  FolderPlus,
  File,
  Command,
  Cloud,
  Book,
  FileText,
  Server,
  Image,
  Sliders,
  Map,
  GitPullRequest,
  Calendar,
  Edit,
  Mail,
  MessageSquare,
  UserCheck,
  Layers,
  HelpCircle,
  Database,
  Headphones,
  Mic,
  ShoppingBag,
  Search,
  AlertOctagon,
  Lock,
  Briefcase,
  BarChart,
} from "react-feather";

export const MENUITEMS = [
  {
    title: "Films",
    icon: Home,
    type: "sub",
    badgeType: "primary",
    active: false,
    children: [
      { path: "/films", title: "Films List", type: "link" },
      { path: "/films/create", title: "Create Movie", type: "link" }

    ],
  },


  // category menu
  {
    title: "Catalog",
    icon: Airplay,
    type: "sub",
    active: false,
    children: [
      { path: "/admin/catalog/categories", title: "categories", type: "link" },

    ],
  },
];
