import { AuthProvider } from "../authContext";
import { FoodsProvider } from "../foodContext";

export default function AddFoodLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <AuthProvider>
        <FoodsProvider>
        {children}

        </FoodsProvider>
      </AuthProvider>

  );
}
