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
        title: "Profile",
        url: `${prefix}/profile`,
      },
      {
        title: "Add Equipment",
        url: `${prefix}/add-equipment`,
      },
    ],
  },
  {
    title: "App Settings",
    url: "#",
    items: [
      {
        title: "Manage Equipment",
        url: `${prefix}/manage-equipment`,
      },
      {
        title: "Manage Rentals",
        url: `${prefix}/manage-rental`,
      },
    ],
  },
];
