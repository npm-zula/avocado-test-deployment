import React from "react";
import "../../globals.css";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

import SearchProfileCard from "@/components/shared/SearchProfileCard";
import SearchPostCard from "@/components/shared/SearchPostCard";

import { searchAccounts, searchPosts } from "@/lib/supabase/api/search";
import { Loader } from "../shared";
import { set } from "react-hook-form";

type Post = {
  id: string;
  caption: string;
  imageUrl: string;
  upvotes: number;
  comments: number;
};

type Account = {
  username: string;
  bio: string;
  ImageURL: string;
};

const Search = () => {
  const [searchInput, setSearchInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const tempUserData = [
    {
      username: "John Doe",
      bio: "This is a bio",
      ImageURL: "/assets/explorer/sideProfile.png",
    },
    {
      username: "Jane Doe",
      bio: "This is a bio",
      ImageURL: "/assets/explorer/sideProfile.png",
    },
    {
      username: "John Doe",
      bio: "This is a bio",
      ImageURL: "/assets/explorer/sideProfile.png",
    },
    {
      username: "Jane Doe",
      bio: "This is a bio",
      ImageURL: "/assets/explorer/sideProfile.png",
    },
    {
      username: "Jane Doe",
      bio: "This is a bio",
      ImageURL: "/assets/explorer/sideProfile.png",
    },
  ];

  const tempPostData = [
    {
      caption: "This is a caption",
      likeCount: 10,
      commentCount: 5,
      ImageURL: "/assets/explorer/sideProfile.png",
    },
    {
      caption: "This is a caption",
      likeCount: 10,
      commentCount: 5,
      ImageURL: "/assets/explorer/sideProfile.png",
    },
    {
      caption: "This is a caption",
      likeCount: 10,
      commentCount: 5,
      ImageURL: "/assets/explorer/sideProfile.png",
    },
    {
      caption: "This is a caption",
      likeCount: 10,
      commentCount: 5,
      ImageURL: "/assets/explorer/sideProfile.png",
    },
    {
      caption: "This is a caption",
      likeCount: 10,
      commentCount: 5,
      ImageURL: "/assets/explorer/sideProfile.png",
    },
  ];

  const [postIsActive, setPostIsActive] = React.useState(true);
  const [accountIsActive, setAccountIsActive] = React.useState(false);
  const [postSearchData, setPostSearchData] = React.useState<Post[]>([]);
  const [accountSearchData, setAccountSearchData] = React.useState<Account[]>(
    []
  );

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setAccountSearchData([]);
    setPostSearchData([]);

    try {
      setIsLoading(true);

      // if search input is empty or less than 3 characters or blank space
      if (e.target.value.length < 3) {
        setIsLoading(false);
        return;
      }

      if (postIsActive) {
        const posts = await searchPosts(e.target.value);
        setPostSearchData(posts);
      } else if (accountIsActive) {
        const accounts = await searchAccounts(e.target.value);
        setAccountSearchData(accounts);
      }
    } catch (error) {
      console.log("Error", error);
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  return (
    <>
      <AlertDialog>
        {/* explore search input */}
        <div className="w-full h-[44px] flex items-center rounded-3xl bg-[var(--light-bg)]">
          <input
            type="text"
            className="bg-transparent text-[12px] font-medium w-[90%] px-4 outline-none"
            value={searchInput}
            onChange={handleSearch}
            placeholder="Search Something..."
          />
          <AlertDialogTrigger>
            <button className="w-[36px] h-[36px] bg-[#64D25F] rounded-3xl flex items-center justify-center ">
              <img
                width={18}
                height={18}
                style={{ objectFit: "cover" }}
                src="/assets/icons/search.svg"
                alt=""
              />
            </button>
          </AlertDialogTrigger>
        </div>

        <AlertDialogContent className="search-component">
          <div className="">
            <AlertDialogHeader className="">
              <div className="flex justify-between items-center">
                <AlertDialogTitle className="">Search Avocado</AlertDialogTitle>
                <AlertDialogCancel>
                  <img
                    width={24}
                    height={24}
                    style={{ objectFit: "cover" }}
                    src="/assets/icons/exit.svg"
                    alt=""
                  />
                </AlertDialogCancel>
              </div>
            </AlertDialogHeader>
          </div>
          <div id="content" className="w-full ">
            {/* search-bar */}
            <div className=" border-b-2 rounded-md border-[#080c0f] my-4">
              <div className="w-full h-[44px] flex items-center rounded-3xl bg-[var(--light-bg)] text-gray-400">
                <input
                  type="text"
                  className="bg-transparent text-base font-medium w-[90%] px-4 outline-none"
                  value={searchInput}
                  onChange={handleSearch}
                  placeholder="Search Something..."
                />
              </div>
            </div>{" "}
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger
                  value="posts"
                  className="w-full"
                  onClick={() => {
                    setPostIsActive(true);
                    setAccountIsActive(false);
                    setAccountSearchData([]);
                  }}>
                  Posts
                </TabsTrigger>
                <TabsTrigger
                  value="accounts"
                  className="w-full"
                  onClick={() => {
                    setPostIsActive(false);
                    setAccountIsActive(true);
                    setPostSearchData([]);
                  }}>
                  Accounts
                </TabsTrigger>
              </TabsList>
              <ScrollArea className="h-[360px] w-full rounded-md p-4 my-2">
                <div>
                  <TabsContent value="posts">
                    <div className="flex flex-col gap-2">
                      {isLoading ? (
                        <div className="flex-center w-full h-full">
                          <Loader />
                        </div>
                      ) : postSearchData.length === 0 ? (
                        <p className="text-light-4 mt-10 text-center w-full">
                          No results found
                        </p>
                      ) : (
                        postSearchData.map((post: Post, index) => {
                          return (
                            <SearchPostCard
                              key={index}
                              caption={post.caption}
                              upvotesCount={post.upvotes}
                              commentCount={post.comments}
                              ImageURL={post.imageUrl}
                            />
                          );
                        })
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="accounts">
                    <div className="flex flex-col gap-2   ">
                      {isLoading ? (
                        <div className="flex-center w-full h-full">
                          <Loader />
                        </div>
                      ) : accountSearchData.length === 0 ? (
                        <p className="text-light-4 mt-10 text-center w-full">
                          No results found
                        </p>
                      ) : (
                        accountSearchData.map((account: Account, index) => {
                          return (
                            <SearchProfileCard
                              key={index}
                              username={account.username}
                              bio={account.bio}
                              ImageURL={account.ImageURL}
                            />
                          );
                        })
                      )}
                    </div>
                  </TabsContent>
                </div>
              </ScrollArea>
            </Tabs>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Search;
