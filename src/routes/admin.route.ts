const prefix = "/admin";

export const adminRoutes = [
  {
    title: "Dashboard ",
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
    ],
  },
  {
    title: "Management",
    url: "#",
    items: [
      {
        title: "Manage Providers",
        url: `${prefix}/manage-provider`,
      },
      {
        title: "Manage users",
        url: `${prefix}/manage-users`,
      },
    ],
  },
];
