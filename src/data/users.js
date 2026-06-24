export const cities = [
  { id: 1, name: "Lahore", created_at: "2023-11-03" },
  { id: 2, name: "Karachi", created_at: "2024-01-12" },
  { id: 3, name: "Islamabad", created_at: "2024-03-21" },
];
export const getUserById = (id) => cities.find((user) => user.id === id);
