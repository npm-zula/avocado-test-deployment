import { useState } from "react";
import React from "react";

import TopHeader from "@/components/shared/TopHeader";
import CreatePost from "@/components/shared/CreatePost";

import Posts from "@/components/shared/Posts";

import RightSideBar from "@/components/RightSidebar";

const Home = () => {
  const [postCount, setPostCount] = useState(0);

  const [isScrolled, setIsScrolled] = useState(false);
  const leftColRef = React.useRef(null);

  const scrollToTop = () => {
    if (leftColRef.current) {
      leftColRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (leftColRef.current) {
      const scrollTop = leftColRef.current.scrollTop;
      setIsScrolled(scrollTop > 0);
    }
  };

  const handlePostCreated = React.useCallback(() => {
    setPostCount((prev) => prev + 1);
  }, []);

  React.useEffect(() => {
    const leftColElement = leftColRef.current;
    if (leftColElement) {
      leftColElement.addEventListener("scroll", handleScroll);
      // Initial check
      handleScroll();
    }
    return () => {
      if (leftColElement) {
        leftColElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="explore-container  w-[100%]  h-[100%] ">
      {/* top Header */}
      <TopHeader />

      <div className=" explore_content_wrap">
        {/* left_wide_col start*/}
        <div className="left_wide_col" ref={leftColRef}>
          <CreatePost onPostCreated={handlePostCreated} />
          <div className="">
            <Posts key={postCount} />
          </div>
          {isScrolled && (
            <button
              onClick={scrollToTop}
              className="fixed text-sm font-medium bottom-20 lg:bottom-10 right-4 lg:right-[27%] z-50 p-3 rounded-2xl text-[#000] bg-[#64D25F] shadow-xl shadow-black ">
              POST
            </button>
          )}
        </div>
        {/* left_wide_col end*/}

        {/* right_col */}
        <RightSideBar />
        {/* Scroll to Top Button */}
      </div>
    </div>
  );
};

export default Home;
