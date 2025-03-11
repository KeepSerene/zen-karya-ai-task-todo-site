// Component import
import Header from "@/components/Header";

// Library import
import { Outlet } from "react-router";

function RootLayout() {
  return (
    <>
      <div className="">
        <Header />

        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default RootLayout;
