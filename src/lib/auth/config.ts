import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
<<<<<<< HEAD
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
=======
>>>>>>> origin/master

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

<<<<<<< HEAD
        try {
          // Find user in database
          const user = await db.user.findUnique({
            where: {
              email: credentials.email
            }
          });

          if (!user) {
            return null;
          }

          // Note: In a real application, you would store hashed passwords
          // For now, we'll use plain text comparison (not recommended for production)
          // You should implement proper password hashing with bcrypt
          const isPasswordValid = credentials.password === "password123"; // Temporary

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
=======
        // Mock user database
        const users = [
          {
            id: "1",
            email: "customer@example.com",
            name: "Ahmed Mohammed",
            role: "CUSTOMER",
            password: "password123"
          },
          {
            id: "2",
            email: "admin@example.com",
            name: "Admin User",
            role: "ADMIN",
            password: "password123"
          }
        ];

        const user = users.find(u => u.email === credentials.email);

        if (!user || user.password !== credentials.password) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
>>>>>>> origin/master
      }
    })
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signUp: "/signup",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, handler };