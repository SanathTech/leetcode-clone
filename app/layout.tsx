import { getServerSession } from "next-auth";
import "./globals.css";
import type { Metadata } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { SessionProvider } from "@/components/SessionProvider";
import Login from "@/components/Login";
import ClientProvider from "@/components/ClientProvider";

export const metadata: Metadata = {
  title: "LeetCloned",
  description: "The Ultimate LeetCode Clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="bg-white text-white h-full">
        <SessionProvider session={session}>
          <ClientProvider />
          {!session ? <Login /> : <div className="bg-black">{children}</div>}
        </SessionProvider>
      </body>
    </html>
  );
}
