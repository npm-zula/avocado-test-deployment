import React from "react";

type SearchProfileCardProps = {
  caption: string;
  upvotesCount: number;
  commentCount: number;
  ImageURL: string;
};

const SearchPostCard = ({
  caption = "Default Caption",
  upvotesCount = 0,
  commentCount = 0,
  ImageURL = "/assets/explorer/sideProfile.png",
}: SearchProfileCardProps) => {
  return (
    <div className="my-1 border-b-2 border-[#080c0f]">
      <div className="flex flex-row justify-start items-center gap-4 w-full p-3  rounded-lg transition-all hover:bg-[#080c0f] cursor-pointer">
        <div className="w-16 h-16 rounded-full ">
          <img
            src={ImageURL || "/assets/explorer/sideProfile.png"}
            alt=""
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-2 justify-center text-gray-400 ">
          <div className="w-full h-4 font-bold "> {caption} </div>
          <div className="w-full h-4 ">
            <span className="">Upvotes: {upvotesCount}</span>
            <span className="ml-4">Comments: {commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPostCard;
