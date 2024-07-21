import Card from "../Card";
import React from "react";

import { getInfinitePosts } from "@/lib/supabase/api/posts";

import { BiDownvote, BiUpvote } from "react-icons/bi";

import { IoIosArrowUp } from "react-icons/io";

import { getUserTags, getTags } from "@/lib/supabase/api/tags";

import Loader from "./Loader";

type CardProps = {
  id: any;
  caption: any;
  imageUrl: any;
  upvotes: any;
  downvotes: any;
  user_profiles: {
    id: any;
    username: any;
    name: any;
  };
  created_at: any;
  comments: any;
};

const Posts = () => {
  const [posts, setPosts] = React.useState<CardProps[]>([]);
  const [activeFilter, setActiveFilter] = React.useState("Most Upvoted");
  const [pageParam, setPageParam] = React.useState(0);

  const [allTags, setAllTags] = React.useState<
    { value: string; label: string }[]
  >([]);
  const [userTags, setUserTags] = React.useState<
    { value: string; label: string }[]
  >([]);
  const [activeTag, setActiveTag] = React.useState("All");
  const [seeAllTags, setSeeAllTags] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const lastPostRef = React.useRef<HTMLDivElement>(null);

  const fetchPosts = async (pageParam: number, tag: string, filter: string) => {
    setIsLoading(true);
    let res: CardProps[] = await getInfinitePosts(pageParam, tag, filter);

    setPosts((prevPosts) => {
      // If it's the first page and we already have posts, don't add duplicates
      if (pageParam === 0 && prevPosts.length > 0) {
        return prevPosts;
      }

      // Otherwise, append new posts
      return [...prevPosts, ...res];
    });

    setIsLoading(false);
  };
  const filters = [
    {
      name: "Most Upvoted",
      icon: <BiUpvote />,
    },
    {
      name: "Most Downvoted",
      icon: <BiDownvote />,
    },
  ];

  React.useEffect(() => {
    const fetchUserTags = async () => {
      const userTags = (await getUserTags()) || [];
      // push all tags to the userTags array first index
      userTags.unshift({ value: "All", label: "All" });

      const tags = userTags.map((tag) => {
        return {
          value: tag.value,
          label: tag.label,
        };
      });

      // push all tags to the userTags array
      setUserTags(tags);
    };

    const fetchTags = async () => {
      const tags = (await getTags()) || [];
      let tagsArr = tags.map((tag) => {
        return {
          value: tag.id,
          label: tag.tag_name,
        };
      });

      // filter out the tags that are already in the userTags array
      tagsArr = tagsArr.filter(
        (tag) => !userTags.some((userTag) => userTag.label === tag.label)
      );

      setAllTags(tagsArr);
    };

    fetchUserTags();
    fetchTags();
  }, []);

  React.useEffect(() => {
    setPosts([]);
    setPageParam(0);
  }, [activeTag, activeFilter]);

  React.useEffect(() => {
    fetchPosts(pageParam, activeTag, activeFilter);
  }, [pageParam, activeTag, activeFilter]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPageParam((prevParam) => prevParam + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (lastPostRef.current) {
      observer.observe(lastPostRef.current);
    }

    return () => {
      if (lastPostRef.current) {
        observer.unobserve(lastPostRef.current);
      }
    };
  }, [isLoading]);

  // React.useEffect(() => {
  //   console.log("page", pageParam);
  // }, [pageParam]);

  return (
    <div>
      <div className="post_category_wrap mt-6 my-3">
        {filters?.map((item, index) => {
          return (
            <div key={index}>
              <p
                onClick={() => setActiveFilter(item.name)}
                className={`post_category ${
                  activeFilter == item.name && "bg-[#64D25F] text-[#000] "
                } `}>
                <span className="flex items-center">
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </span>
              </p>
            </div>
          );
        })}
      </div>

      {/* user tags */}

      <div className="flex items-center justify-between ">
        <div className="post_category_wrap ">
          {userTags?.map((item, index) => {
            return (
              <div key={index}>
                <p
                  onClick={() => setActiveTag(item.label)}
                  className={`post_category ${
                    activeTag == item.label && "bg-[#64D25F] text-[#000] "
                  } `}>
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
        <div className="w-[140px]">
          <button
            onClick={() => setSeeAllTags(!seeAllTags)}
            className="text-[#97999A] hover:text-[#97999A]/80 transition-all flex items-center">
            See More{" "}
            <span className="mx-2">
              <IoIosArrowUp
                className={` ${
                  seeAllTags ? "" : "transform rotate-180"
                } transition-all`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* all tags */}

      {seeAllTags && (
        <div className="post_category_wrap">
          {allTags?.map((item, index) => {
            return (
              <div key={index}>
                <p
                  onClick={() => setActiveTag(item.label)}
                  className={`post_category ${
                    activeTag == item.label && "bg-[#64D25F] text-[#000] "
                  } `}>
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* <div className="post_category_wrap">
        {allTags?.map((item, index) => {
          return (
            <div key={index}>
              <p
                onClick={() => setActiveTag(item.label)}
                className={`post_category ${
                  activeTag == item.label && "bg-[#64D25F] text-[#000] "
                } `}>
                {item.label}
              </p>
            </div>
          );
        })}
      </div> */}

      {posts.map((post, index) => {
        return (
          <div
            key={index}
            ref={index === posts.length - 1 ? lastPostRef : null}>
            <Card
              id={post.id}
              caption={post.caption}
              imageUrl={post.imageUrl}
              created_at={post.created_at}
              upvotes={post.upvotes}
              downvotes={post.downvotes}
              user_profiles={post.user_profiles}
              comments={post.comments}
            />
          </div>
        );
      })}
      {isLoading && <Loader />}
    </div>
  );
};

export default Posts;
