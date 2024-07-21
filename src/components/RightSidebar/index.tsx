import React from "react";
import Search from "@/components/explore/Search";
import LeaderBoard from "@/components/LeaderBoard";

const RightSidebar = () => {
  return (
    <div className="right_col ">
      {/* right searchbar start */}
      <Search />
      <div className="w-full ">
        {/* <ProfileInfoCard /> */}
        <LeaderBoard />
      </div>
    </div>
  );
};

export default RightSidebar;
