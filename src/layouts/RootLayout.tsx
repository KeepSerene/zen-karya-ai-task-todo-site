// Component imports
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Library imports
import { Outlet, useNavigation } from "react-router";
import { Loader2 } from "lucide-react";

// Asset import
import { logo } from "@/assets/assets";

function RootLayout() {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading" && !navigation.formData;

  return (
    <>
      <div className="min-h-[100dvh] overflow-hidden flex flex-col relative isolate">
        <Header />

        <main className="grow pt-36 pb-16 grid grid-cols-1 items-center">
          <Outlet />
        </main>

        <Footer />

        {/* Background patterns */}
        <div className="w-80 h-10 bg-primary/20 blur-3xl origin-top-left rotate-45 absolute left-0 top-20" />
        <div className="w-80 h-10 bg-primary/20 blur-3xl origin-top-right -rotate-45 absolute right-0 top-20" />

        {/* Loader */}
        {isLoading && (
          <div className="w-full h-dvh bg-background fixed left-0 top-0 z-50 flex flex-col justify-center items-center gap-5">
            <img src={logo} width={64} height={64} alt="Logo" />

            <Loader2 className="text-muted-foreground animate-spin" />
          </div>
        )}
      </div>
    </>
  );
}

export default RootLayout;
