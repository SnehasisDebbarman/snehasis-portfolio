const sampleJson = Object.freeze({
  user: {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    isActive: true,
  },
  roles: ["admin", "editor"],
});

export const JSON_TEMPLATE = JSON.stringify(sampleJson, null, 2);
