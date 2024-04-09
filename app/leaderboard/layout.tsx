import { AuthProvider } from "../authContext";
import { FoodsProvider } from "../foodContext";

export default function LeaderboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FoodsProvider>
      <AuthProvider>{children}</AuthProvider>
    </FoodsProvider>
  );
}
