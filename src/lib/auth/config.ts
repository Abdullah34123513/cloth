import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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