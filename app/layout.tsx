import ContextProvider from "./AppContext";

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
      </body>
    </html>
  );
}
