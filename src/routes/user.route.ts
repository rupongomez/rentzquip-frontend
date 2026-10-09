const prefix = "/user";

export const userRoutes = [
  {
    title: "management ",
    url: "#",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "User Profile",
        url: `${prefix}/profile`,
      },
    ],
  },
  {
    title: "App Settings",
    url: "#",
    items: [
      {
        title: "Become a Provider",
        url: `${prefix}/become-provider`,
      },
      {
        title: "Rental Management",
        url: `${prefix}/manage-rental`,
      },
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
