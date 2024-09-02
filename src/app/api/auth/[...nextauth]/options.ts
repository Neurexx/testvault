import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from "bcrypt"
import dbConnect from '@/lib/dbConnect';

import UserModel from '@/models/userModel';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { name: credentials.identifier },
            ],
          });
          if (!user) {
            throw new Error('No user found with this email');
          }
          
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error('Incorrect password');
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        //@ts-ignore
        token._id = user._id?.toString(); // Convert ObjectId to string
      
        token.username = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        //@ts-ignore
        session.user._id = token._id;
        //@ts-ignore
        session.user.name = token.name;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
};