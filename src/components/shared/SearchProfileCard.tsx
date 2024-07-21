import React from "react";

type SearchProfileCardProps = {
  username: string;
  bio: string;
  ImageURL: string;
};

const SearchProfileCard = ({
  username = "Default Username",
  bio = "This is the Default Bio",
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
          <div className="w-full h-4 font-bold "> {username} </div>
          <div className="w-full h-4 font-medium ">{bio}</div>
        </div>
      </div>
    </div>
  );
};

export default SearchProfileCard;
