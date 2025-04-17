import { compare } from "bcryptjs";
import { type NextAuthConfig, type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "~/server/db";
import { LoginSchema } from "~/server/validator/auth";

const authDefaultConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Your email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;

          if (credentials?.email === undefined) {
            throw new Error("Email not provided");
          }

          const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.email, email),
          });

          if (!user) {
            throw new Error("User not found!");
          }

          if (!user.password) {
            throw new Error("You're not configured password yet");
          }

          const passwordMatch = await compare(password, user.password);

          if (!passwordMatch) {
            throw new Error(" Email and password doest match");
          }

          if (!credentials) {
            throw new Error("Something went wrong");
          }

          const userData: User = {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          };

          return userData;
        }

        return null;
      },
    }),
  ],
};

export default authDefaultConfig;
