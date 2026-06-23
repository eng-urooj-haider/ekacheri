export const users = [
  {
    id: "1",
    name: "Ayesha Khan",
    email: "ayesha@ssgc.com",
    status: "active",
    joined: "2024-01-12",
  },
  {
    id: "2",
    name: "Bilal Ahmed",
    email: "bilal@ssgc.com",
    status: "inactive",
    joined: "2023-11-03",
  },
  {
    id: "3",
    name: "Sara Malik",
    email: "sara@ssgc.com",
    status: "active",
    joined: "2024-03-21",
  },
];

export const getUserById = (id) => users.find((user) => user.id === id);
