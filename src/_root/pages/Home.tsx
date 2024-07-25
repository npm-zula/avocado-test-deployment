import { useEffect, useState } from "react";
import React from "react";
import { useInView } from "react-intersection-observer";

import { Input } from "@/components/ui";
import useDebounce from "@/hooks/useDebounce";
import { GridPostList, Loader, PostCard, Topbar } from "@/components/shared";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queries";
import TopHeader from "@/components/shared/TopHeader";
import CreatePost from "@/components/shared/CreatePost";
import { sort_filters, postTags } from "@/constants";
import PostDetails from "./PostDetails";
import Posts from "@/components/shared/Posts";

import { Button } from "@/components/ui/button";

import RightSideBar from "@/components/RightSidebar";

export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: any;
};

const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultProps) => {
  if (isSearchFetching) {
    return <Loader />;
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  } else {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    );
  }
};

const Home = () => {
  // const { ref, inView } = useInView();
  // const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  // const [searchValue, setSearchValue] = useState("");
  // const debouncedSearch = useDebounce(searchValue, 500);
  // const { data: searchedPosts, isFetching: isSearchFetching } =
  //   useSearchPosts(debouncedSearch);

  // useEffect(() => {
  //   if (inView && !searchValue) {
  //     fetchNextPage();
  //   }
  // }, [inView, searchValue]);

  // if (!posts)
  //   return (
  //     <div className="flex-center w-full h-full">
  //       <Loader />
  //     </div>
  //   );

  // const shouldShowSearchResults = searchValue !== "";
  // const shouldShowPosts =
  //   !shouldShowSearchResults &&
  //   posts.pages.every((item) => item.documents.length === 0);\

  const [postCount, setPostCount] = useState(0);

  const handlePostCreated = React.useCallback(() => {
    setPostCount((prev) => prev + 1);
  }, []);

  return (
    <div className="explore-container  w-[100%]  h-[100%] ">
      {/* top Header */}
      <TopHeader />

      <div className=" explore_content_wrap">
        {/* left_wide_col start*/}
        <div className="left_wide_col">
          <CreatePost onPostCreated={handlePostCreated} />
          <div className="">
            <Posts key={postCount} />
          </div>
        </div>
        {/* left_wide_col end*/}

        {/* right_col */}
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
