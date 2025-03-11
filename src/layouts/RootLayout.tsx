// Component imports
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Library import
import { Outlet } from "react-router";

function RootLayout() {
  return (
    <>
      <div className="min-h-[100dvh] overflow-hidden flex flex-col">
        <Header />

        <main className="grow pt-36 pb-16 grid grid-cols-1 items-center">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default RootLayout;
