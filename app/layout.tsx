import "../styles/globals.css";
import ContextProvider from "./AppContext";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Gerador de voz do TikTok",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ContextProvider>{children}</ContextProvider>
        <Analytics />
      </body>
    </html>
  );
}
