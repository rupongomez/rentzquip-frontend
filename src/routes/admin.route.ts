const prefix = "/admin";

export const adminRoutes = [
  {
    title: "management ",
    url: "#",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "profile",
        url: `${prefix}/profile`,
      },
      {
        title: "Manage Providers",
        url: `${prefix}/manage-provider`,
      },
    ],
  },
  {
    title: "App Settings",
    url: "#",
    items: [
      {
        title: "Routing",
        url: "#",
      },
      {
        title: "Data Fetching",
        url: "#",
      },
    ],
  },
];
