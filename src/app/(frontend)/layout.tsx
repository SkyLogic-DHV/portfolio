import SplashScreen from "@/components/ui/splash-screen";

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      <SplashScreen>{children}</SplashScreen>
    </div>
  );
}
