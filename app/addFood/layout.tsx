import { AuthProvider } from "../authContext";

export default function AddFoodLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <AuthProvider>
            {children}
      </AuthProvider>

  );
}
