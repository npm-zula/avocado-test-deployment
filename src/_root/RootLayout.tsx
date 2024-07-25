import { Outlet } from "react-router-dom";

import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";

const RootLayout = () => {
  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex overflow-x-hidden overflow-y-auto w-[100%] h-[90%] sm:h-[100%]">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  );
};

export default RootLayout;
