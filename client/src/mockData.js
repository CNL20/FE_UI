// Mock user data
export const mockUsers = [
  {
    id: "1",
    name: "Manager User",
    email: "manager@school.com",
    password: "manager123",
    role: "manager",
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@school.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "3",
    name: "Nurse User",
    email: "nurse@school.com",
    password: "nurse123",
    role: "nurse",
  },
  {
    id: "4",
    name: "Parent User",
    email: "parent@school.com",
    password: "parent123",
    role: "parent",
  },
];

// Mock login function
export const mockLogin = async (username, password) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = mockUsers.find(
    (u) => u.email === username && u.password === password
  );

  if (!user) {
    throw new Error("Email hoặc mật khẩu không đúng");
  }

  // Create a mock token
  const token = "mock-jwt-token-" + Math.random();

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
