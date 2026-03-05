import { User } from "@/stores/user-store";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Dummy user database (in real app, this would be a backend)
const dummyUsers: Array<User & { password: string }> = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    role: "admin",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    password: "john123",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    role: "user",
  },
];

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Simulate login API
export async function loginApi(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  await delay(1000); // Simulate network latency

  const user = dummyUsers.find(
    (u) => u.email === credentials.email && u.password === credentials.password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const { password: _, ...userWithoutPassword } = user;
  return {
    user: userWithoutPassword,
    token: `dummy-token-${user.id}-${Date.now()}`,
  };
}

// Simulate signup API
export async function signupApi(
  credentials: SignupCredentials
): Promise<AuthResponse> {
  await delay(1000); // Simulate network latency

  // Check if user already exists
  const existingUser = dummyUsers.find((u) => u.email === credentials.email);
  if (existingUser) {
    throw new Error("Email already registered");
  }

  // Create new user
  const newUser: User = {
    id: String(dummyUsers.length + 1),
    name: credentials.name,
    email: credentials.email,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.name}`,
    role: "user",
  };

  // Add to dummy database (in memory, will reset on page reload)
  dummyUsers.push({ ...newUser, password: credentials.password });

  return {
    user: newUser,
    token: `dummy-token-${newUser.id}-${Date.now()}`,
  };
}

// Simulate logout API
export async function logoutApi(): Promise<void> {
  await delay(500);
  // In real app, this would invalidate the token on the server
}

// Simulate get current user API
export async function getCurrentUserApi(
  token: string
): Promise<User | null> {
  await delay(500);

  // Extract user ID from dummy token
  const match = token.match(/dummy-token-(\d+)/);
  if (!match) return null;

  const userId = match[1];
  const user = dummyUsers.find((u) => u.id === userId);

  if (!user) return null;

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
