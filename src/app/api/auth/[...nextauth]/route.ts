import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// For demo purposes, using simple hardcoded credentials
// In production, connect to your database
const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    image: "https://placehold.co/60x60/0f172a/white?text=JD",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    image: "https://placehold.co/60x60/0f172a/white?text=JS",
  },
];

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find user in the mock data
        const user = users.find(
          (u) =>
            u.email === credentials.email &&
            u.password === credentials.password
        );

        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET || "default_secret_key_for_development",
});