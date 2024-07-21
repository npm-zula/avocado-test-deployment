import React from "react";
import Search from "@/components/explore/Search";
import LeaderBoard from "@/components/LeaderBoard";

const RightSidebarMobile = () => {
  return (
    <div className="">
      {/* right searchbar start */}
      <Search />
      <div className="w-full ">
        {/* <ProfileInfoCard /> */}
        <LeaderBoard />
      </div>
    </div>
  );
};

export default RightSidebarMobile;
