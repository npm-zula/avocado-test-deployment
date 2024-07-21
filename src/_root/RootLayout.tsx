import { Outlet } from "react-router-dom";

import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";

const RootLayout = () => {
  return (
    <div className="w-[100vw] overflow-x-hidden md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex overflow-x-hidden w-[100%] h-full">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  );
};

export default RootLayout;
