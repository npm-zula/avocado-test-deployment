import React from "react";

import RightSidebarMobile from "@/components/RightSidebarMobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { PiAvocado } from "react-icons/pi";

const TopHeader = () => {
  return (
    <div className="top-header-wrap ">
      {/* <div className="text-[#DFDFE0] hidden sm:block">
        <p className="text-[10px] sm:text-[14px]  ">Saturday, November 18</p>
        <p className="text-[14px] sm:text-[18px]">
          Good Morning, <strong className="text-white">Elisha A.</strong>
        </p>
      </div> */}
      <div className="flex items-center sm:ms-auto gap-3 w-full sm:w-auto  flex-row-reverse  sm:flex-row">
        <div className="top_header_search_input">
          <img
            src="/assets/explorer/search-normal.svg"
            width={18}
            height={18}
            alt="search"
          />
          <input
            type="text"
            className="w-[70%] bg-dark-4 text-[14px] mx-2"
            placeholder="Search Something..."
            style={{ outline: "none" }}
          />
          <div className="flex flex-grow items-center justify-center w-[60px] h-[32px] bg-dark-2 rounded-3xl font-normal gap-1">
            <img
              src="/assets/explorer/command.svg"
              alt=""
              width={12}
              height={12}
            />
            +<p>K</p>
          </div>
        </div>

        <div className="w-[45px] h-[45px] bg-dark-4 rounded-3xl flex items-center justify-center relative">
          <img src="/assets/explorer/notification.svg" width={24} height={24} />
          <div className="w-2 h-2 bg-[#4ADE80] rounded-3xl absolute top-0 right-0"></div>
        </div>
        {/* <div className="w-[45px] h-[45px] bg-dark-4 rounded-3xl flex items-center justify-center ">
          <img src="/assets/explorer/setting.svg" width={24} height={24} />
        </div> */}
        <div className="block lg:hidden">
          <Drawer>
            <DrawerTrigger>
              <div className="w-[45px] h-[45px] bg-dark-4 rounded-3xl flex items-center justify-center text-[#97999A]  ">
                <PiAvocado size={24} />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle></DrawerTitle>
              </DrawerHeader>
              <div className="bg-[#000] p-3">
                {" "}
                <RightSidebarMobile />
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        {/* <div className="w-[1px] h-[20px] bg-dark-4 " />
        <div className="flex items-center  me-auto">
          <div className="topheader_profile_image_wrap me-3">
            <img
              className="w-[85%] h-[85%]"
              src="/assets/explorer/profileImg.svg"
              alt=""
            />
          </div>
          <div>
            <h6 className="text-[12px] sm:text-[16px] ">Kartik Raghuram</h6>
            <p className="text-[10px] sm:text-[14px] text-[#97999A]">
              @Kartik867
            </p>
          </div>
          <div className="w-[30px] h-[30px] rounded-md flex items-center justify-center bg-dark-4 ms-4 ">
            <img
              src="/assets/explorer/Frame.svg"
              width={20}
              height={10}
              style={{ objectPosition: "center" }}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TopHeader;
