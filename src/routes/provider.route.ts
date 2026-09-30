const prefix = "/provider";

export const providerRoutes = [
  {
    title: "management ",
    url: "#",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "Apply to Provider ",
        url: `${prefix}/approve-provider`,
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
