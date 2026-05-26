// import type { ImageProps } from "../../types/app";

import type {
  FooterConfig,
  HeaderConfig,
  NavigationAction,
  NavigationConfig,
  NavigationItem,
  NavbarConfig,
} from "../../types/navigation";

const logoConfig: string = "VivekCSE";
// const logoConfig: ImageProps = {
//   id: "main-navigation-logo",
//   src: "/main-navigation-logo.png",
//   alt: "main-navigation-logo",
//   href: "/",
//   width: 100,
//   height: 100,
//   color: "#ffffff",
//   className: "main-navigation-logo",
//   loading: "lazy",
// };

// Navigation Items
export const navigationItems: NavigationItem[] = [
  {
    id: "Home",
    label: "Home",
    href: "/",
    icon: {
      node: "House",
    },
    isActive: true,
  },

  {
    id: "Auth-System",
    label: "Authentication",
    href: "/auth",
    icon: {
      node: "Lock",
    },
  },

  {
    id: "Counter-App",
    label: "Counter App",
    href: "/counter",
    icon: {
      node: "Calculator",
    },
  },

  {
    id: "Todo-App",
    label: "Todo App",
    href: "/todo-app",
    icon: {
      node: "ListTodo",
    },
  },

  {
    id: "Searchbar",
    label: "Searchbar",
    href: "/search",
    icon: {
      node: "Search",
    },
  },

  {
    id: "Navigation",
    label: "Navigation",
    href: "/navigation",
    icon: {
      node: "Navigation",
    },
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
    icon: {
      node: "Mail",
    },
  },
];

// Navigation Actions
export const navigationActions: NavigationAction[] = [
  {
    id: "login",
    label: "Log in",
    variant: "ghost",
    authVisibility: "unauthorizedOnly",
  },
  {
    id: "signup",
    label: "Get started",
    variant: "primary",
    authVisibility: "unauthorizedOnly",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: {
      node: "ChartBar",
    },
    authVisibility: "authorizedOnly",
  },
  {
    id: "logout",
    label: "Logout",
    variant: "danger",
    authVisibility: "authorizedOnly",
  },
];

// Navbar Config
export const navbarConfig: NavbarConfig = {
  navigation: navigationItems,
  actions: navigationActions,
};

// Header Config
export const headerConfig: HeaderConfig = {
  id: "main-header",
  theme: "dark",
  sticky: true,
  mobileRefinedPosition: "right",
  mobileBreakpoint: 1024,
  showMobileMenu: true,
  showDesktopMenu: true,
  logo: logoConfig,
  navbar: navbarConfig,
};

// Footer Config
export const footerConfig: FooterConfig = {
  summary: {
    title: "VivekCSE",

    description: "Learn React from begginer to advanced level (industry standard)",

    copyright: `© ${new Date().getFullYear()} VivekCSE`,
  },

  sections: [
    {
      id: "product",
      label: "Product",
      links: [
        {
          id: "features",
          label: "Features",
          href: "/features",
        },

        {
          id: "pricing",
          label: "Pricing",
          href: "/pricing",
        },

        {
          id: "faq",
          label: "FAQ",
          href: "/faq",
        },
      ],
    },

    {
      id: "company",
      label: "Company",
      links: [
        {
          id: "about",
          label: "About",
          href: "/about",
        },

        {
          id: "contact",
          label: "Contact",
          href: "/contact",
        },

        {
          id: "careers",
          label: "Careers",
          href: "/careers",
        },
      ],
    },

    {
      id: "legal",
      label: "Legal",
      links: [
        {
          id: "privacy",
          label: "Privacy Policy",
          href: "/privacy",
        },

        {
          id: "terms",
          label: "Terms of Service",
          href: "/terms",
        },
      ],
    },
  ],

  socialLinks: [
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com",
      external: true,
    },

    {
      id: "discord",
      label: "Discord",
      href: "https://discord.com",
      external: true,
    },
  ],
};

// Global Navigation Config
export const mainNavigation: NavigationConfig = {
  header: headerConfig,
  footer: footerConfig,
};
