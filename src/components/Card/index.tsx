import { IUser } from "@/types";
import React, { useEffect, useState } from "react";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { FiMessageCircle, FiSend, FiBookmark } from "react-icons/fi";

import { useUserContext } from "@/context/AuthContext";

import {
  upvotePost,
  downvotePost,
  commentOnPost,
} from "@/lib/supabase/api/posts";
import { set } from "react-hook-form";

type CardProps = {
  id: any;
  caption: any;
  created_at: any;
  imageUrl: any;
  upvotes: any;
  downvotes: any;
  user_profiles: {
    id: any;
    username: any;
    name: any;
  }[];
  comments: any;
};

const Card = (post: CardProps) => {
  const { user } = useUserContext();

  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [downvotes, setDownvotes] = useState(post.downvotes);
  const [upvoted, setUpvoted] = useState(upvotes?.includes(user?.id));
  const [downvoted, setDownvoted] = useState(downvotes?.includes(user?.id));

  // upvotes/downvotes

  const handleUpvote = async () => {
    // if user id is not in upvotes array, add it
    let newUpvotes = [];
    if (upvotes?.includes(user?.id)) {
      newUpvotes = upvotes.filter((item) => item !== user?.id);
      setUpvotes(newUpvotes);
    } else {
      newUpvotes = [...upvotes, user?.id];
      setUpvotes(newUpvotes);
    }

    await upvotePost(newUpvotes, post.id);
  };

  const handleDownvote = async () => {
    // if user id is not in downvotes array, add it
    let newDownvotes = [];
    if (downvotes?.includes(user?.id)) {
      newDownvotes = downvotes.filter((item) => item !== user?.id);
      setDownvotes(newDownvotes);
    } else {
      newDownvotes = [...downvotes, user?.id];
      setDownvotes(newDownvotes);
    }

    await downvotePost(newDownvotes, post.id);
  };

  const icons = [
    <div
      onClick={handleUpvote}
      className={`${upvoted ? "text-slate-400" : ""}`}>
      <BiSolidUpvote size={25} />
    </div>,
    <div
      onClick={handleDownvote}
      className={`${downvoted ? "text-slate-400" : ""}`}>
      <BiSolidDownvote size={25} />
    </div>,
    <FiMessageCircle size={25} />,
    <FiSend size={25} />,
    <FiBookmark size={25} />,
  ];

  // timestamp
  const generateRelativeTime = (date: any) => {
    const currentDate = new Date();
    const postDate = new Date(date);
    const diff = currentDate.getTime() - postDate.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // for days
    if (hours > 24) {
      if (hours > 48) {
        return `${Math.floor(hours / 24)} days ago`;
      }
      return `1 day ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  };

  // comments
  const [commentsList, setCommentsList] = useState(post.comments);
  const [userComment, setUserComment] = useState("");

  const handleCreateComment = async () => {
    try {
      if (!userComment) {
        alert("Please enter a comment");
        return;
      }

      const newComment = {
        text: userComment,
        user: {
          id: user?.id,
          username: user?.username,
        },
        created_at: new Date().toISOString(),
      };

      let updatedComments: {
        text: string;
        user: { id: string; username: string };
        created_at: string;
      }[] = [];

      updatedComments = [...commentsList, newComment];

      await commentOnPost(post.id, updatedComments);
      setCommentsList(updatedComments);

      setUserComment("");
    } catch (error) {
      console.log("error", error);
    }
  };

  React.useEffect(() => {
    if (upvotes == null) {
      setUpvotes([]);
    }
    if (downvotes == null) {
      setDownvotes([]);
    }
    if (commentsList == null) {
      setCommentsList([]);
    }
  }, []);

  React.useEffect(() => {
    if (upvotes?.includes(user?.id)) {
      setUpvoted(true);
    } else {
      setUpvoted(false);
    }

    if (downvotes?.includes(user?.id)) {
      setDownvoted(true);
    } else {
      setDownvoted(false);
    }
  }, [upvotes, downvotes, commentsList]);

  return (
    <div className="bg-[var(--light-bg)] rounded-md mb-10">
      {/* user info */}
      <div className="flex items-center p-3">
        <div className="w-[36px] h-[36px] border border-[#D2C65F] rounded-3xl">
          <img
            src="/assets/explorer/profileimg2.svg"
            style={{ objectFit: "cover" }}
            alt=""
          />
        </div>
        <div className="ms-2">
          <p className="text-sm">
            {post.user_profiles.name || "Default Name"}{" "}
          </p>
          <p className="text-xs text-[#97999A]">
            @{post.user_profiles.username} &#x25CF;{" "}
            {generateRelativeTime(post.created_at)}
          </p>
        </div>
        <div className="text-[10px] text-[#7A7C7D] ms-auto">
          &#x25CF; &#x25CF; &#x25CF;
        </div>
      </div>

      {/* content */}
      {post.imageUrl ? (
        <div>
          {/* image */}
          <div className="w-full overflow-y-hidden">
            <img
              height={"100%"}
              className="sm:max-h-[327px] h-[300px] max-w-full mx-auto "
              src={post.imageUrl}
              alt=""
            />
          </div>

          {/* comments */}
          <div className="p-2">
            <div className="flex items-center gap-2 ">
              {icons?.map((item, index) => {
                return (
                  <div className={`${index == 4 ? "ml-auto" : "ml-0"}`}>
                    {item}
                  </div>
                );
              })}
            </div>
            <p className="sm:text-[14px] text-[12px] mt-1 font-semibold">
              {upvotes?.length} Upvotes
            </p>
            <p className="sm:text-[14px] text-[12px] mt-1 font-semibold">
              {post.user_profiles.name} - {post.caption}
            </p>

            {commentsList?.length > 0 && (
              <p className="sm:text-[14px] text-[12px] text-[#97999A] mt-1 font-medium">
                View all {commentsList?.length} comments
              </p>
            )}

            {commentsList?.length > 0 &&
              commentsList?.map((item: any, index: number) => {
                return (
                  <div key={index} className="flex mt-1 ">
                    <p className="w-[300px] lg:w-full sm:text-base text-sm font-semibold text-[#DFDFE0] ">
                      {item?.user.username}
                      <span className="text-white ml-2">{item?.text}</span>
                    </p>
                    {/* <img
                      width={18}
                      height={18}
                      className="ms-auto"
                      src="/assets/explorer/heart-comment.svg"
                      alt=""
                    /> */}
                  </div>
                );
              })}
            <div className="flex items-center w-full h-[50px] bg-[var(--dark-bg)] rounded-lg px-2 gap-2 mt-3">
              <div className="border-4 border-[#27272A] rounded-xl w-[40px] h-[40px]">
                <img
                  width={32}
                  height={32}
                  src="/assets/explorer/profileimg2.svg"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <input
                className="bg-transparent w-[60%]  flex-grow outline-none text-[14px] font-medium"
                placeholder="Write your comment..."
                type="text"
                name="comment"
                value={userComment}
                onChange={(e) => setUserComment(e?.target?.value)}
                id=""
              />

              <button className="bg-[#64D25F] rounded-xl w-[40px] h-[40px] flex items-center justify-center">
                <img
                  width={20}
                  height={20}
                  src="/assets/explorer/send-2.svg"
                  style={{ objectFit: "cover" }}
                  // onClick={handleSend}
                />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* image */}
          <div className="w-full overflow-y-hidden">
            <div className="sm:max-h-[327px] h-[300px] bg-[#000] flex items-center justify-center">
              <div className="flex flex-col justify-center items-center">
                <h2 className="font-bold text-4xl ">{post.caption}</h2>
              </div>
            </div>
          </div>

          {/* comments */}
          <div className="p-2">
            <div className="flex items-center gap-2 ">
              {icons?.map((item, index) => {
                return (
                  <div className={`${index == 4 ? "ml-auto" : "ml-0"}`}>
                    {item}
                  </div>
                );
              })}
            </div>
            <p className="sm:text-[14px] text-[12px] mt-2 font-semibold">
              {upvotes?.length} Upvotes
            </p>
            {commentsList?.length > 0 && (
              <p className="sm:text-[14px] text-[12px] text-[#97999A] mt-1 font-medium">
                View all {commentsList?.length} comments
              </p>
            )}

            {commentsList?.length > 0 &&
              commentsList?.map((item: any, index: number) => {
                return (
                  <div key={index} className="flex mt-1 ">
                    <p className="w-[300px] lg:w-full sm:text-base text-sm font-semibold text-[#DFDFE0] ">
                      {item?.user.username}
                      <span className="text-white ml-2">{item?.text}</span>
                    </p>
                    {/* <img
                      width={18}
                      height={18}
                      className="ms-auto"
                      src="/assets/explorer/heart-comment.svg"
                      alt=""
                    /> */}
                  </div>
                );
              })}
            <div className="flex items-center w-full h-[50px] bg-[var(--dark-bg)] rounded-lg px-2 gap-2 mt-3">
              <div className="border-4 border-[#27272A] rounded-xl w-[40px] h-[40px]">
                <img
                  width={32}
                  height={32}
                  src="/assets/explorer/profileimg2.svg"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <input
                className="bg-transparent w-[60%]  flex-grow outline-none text-[14px] font-medium"
                placeholder="Write your comment..."
                type="text"
                name="comment"
                value={userComment}
                onChange={(e) => setUserComment(e?.target?.value)}
                id=""
              />

              <button className="bg-[#64D25F] rounded-xl w-[40px] h-[40px] flex items-center justify-center">
                <img
                  width={20}
                  height={20}
                  src="/assets/explorer/send-2.svg"
                  style={{ objectFit: "cover" }}
                  onClick={handleCreateComment}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
