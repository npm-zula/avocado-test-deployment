import { postTypes } from "@/constants";
import React from "react";

import { useUserContext } from "@/context/AuthContext";
import { INewPost } from "@/types";

import { createPost } from "@/lib/supabase/api/posts";
import { Separator } from "@/components/ui/separator";

import { MdCancel } from "react-icons/md";
import { FaUpload } from "react-icons/fa";

import { Loader } from "@/components/shared";

import { postTags } from "@/constants";

const CreatePost = ({ onPostCreated }: any) => {
  const { user } = useUserContext();

  const [post, setPost] = React.useState<INewPost>({
    userId: "",
    caption: "",
    tags: [],
    file: null,
  });

  const [tags, setTags] = React.useState<{ value: string; label: string }[]>(
    []
  );
  const [activeTags, setActiveTags] = React.useState<string[]>([]);
  const [postType, setPostType] = React.useState(0);

  const [loading, setLoading] = React.useState(false);

  const addTag = async (tag: any) => {
    // add tag to active tags if it doesn't exist in the array or remove it if it does
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter((item) => item !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };

  const createNewPost = async () => {
    if (post.caption.length === 0) {
      alert("Please add a caption");
      return;
    }

    if (activeTags.length === 0) {
      alert("Please add a tag");
      return;
    }

    setLoading(true);

    post.tags = activeTags;

    // if (post.file) {
    //   setPostType(1);
    // }

    try {
      const res = await createPost(post, postType);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);

    setPost((prev) => ({
      ...prev,
      caption: "",
      tags: [],
      file: null,
    }));
    setActiveTags([]);

    // Call the callback function to notify the parent
    if (onPostCreated) {
      onPostCreated();
    }
  };

  const triggerFileInput = () => {
    if (post.file) {
      alert("You can only upload one file with a post");
      return;
    }

    const fileInput = document.getElementById("fileInput");
    fileInput?.click();
  };

  const fileUpload = (e: any) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setPost((prev) => ({
      ...prev,
      file: file,
    }));

    setPostType(1);
  };

  React.useEffect(() => {
    setPost((prev) => ({
      ...prev,
      userId: user?.id,
    }));

    const fetchTags = async () => {
      const tags = await postTags();
      setTags(tags);
    };
    fetchTags();
  }, []);

  return (
    <div className="create_post_wrap">
      <div className="sm:block hidden">
        <div className="border-4 border-[#27272A] rounded-xl w-[50px] h-[50px] ">
          <img
            src="/assets/explorer/profileimg2.svg"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      {loading ? (
        <div className="flex flex-row justify-center mx-auto items-center py-20">
          <Loader />
        </div>
      ) : (
        <div className="flex-grow w-full">
          <div className="w-full mb-6 gap-4 flex items-center flex-wrap rounded-3xl bg-[var(--light-bg)]">
            <input
              className="post_input"
              type="text"
              value={post.caption}
              onChange={(e) =>
                setPost((prev) => ({ ...prev, caption: e.target.value }))
              }
              placeholder="What idea do you have? "
            />
            <div className="ms-auto">
              {/* post button */}
              <button
                onClick={createNewPost}
                className=" px-5 py-3 font-bold rounded-2xl text-[#000] bg-[#64D25F]   flex items-center justify-center ">
                POST
              </button>
            </div>
          </div>
          <div className="my-2 mb-4">
            {post.file && (
              <div className="w-[250px] p-2 rounded-lg cursor-pointer relative flex items-center justify-between  hover:bg-[#000]/50 transition-all bg-[#000]/20">
                <div className="flex items-center gap-4">
                  <img
                    src={URL.createObjectURL(post.file)}
                    className="w-20 h-12 object-cover rounded-md opacity-70"
                  />
                  <h2>
                    {post.file.name.length > 20
                      ? post.file.name.substring(0, 10) + "..."
                      : post.file.name}
                  </h2>
                </div>
                <div
                  className=" text-[#696969] px-2"
                  onClick={() =>
                    setPost((prev) => ({
                      ...prev,
                      file: null,
                    }))
                  }>
                  <MdCancel />
                </div>
              </div>
            )}
          </div>

          <Separator />

          <div className="my-2 p-1">
            <p className="texl-xl font-medium">Choose Tags</p>
            <div className="tags_wrap ">
              {tags?.map((item, index) => {
                return (
                  <div key={index}>
                    <p
                      onClick={() => addTag(item.label)}
                      className={`tags  ${
                        activeTags.includes(item.label) &&
                        "bg-[#64D25F] text-[#000]"
                      } border-[#000] border-2 font-medium`}>
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>{" "}
          </div>

          <div className="flex items-center mt-3 gap-3 flex-wrap">
            <div className="postTypeBtn" onClick={triggerFileInput}>
              {/* <img src={item?.img_title} alt="" /> */}
              <FaUpload />
              Picture / Gif
            </div>

            {/* {postTypes?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="postTypeBtn"
                  onClick={triggerFileInput}>
                  <img src={item?.img_title} alt="" />
                  {item?.title}
                </div>
              );
            })} */}
            <input
              id="fileInput"
              type="file"
              onChange={fileUpload}
              className="appearance-none hidden"
              style={{ visibility: "hidden" }}
            />

            <div className="px-5 py-3 rounded-2xl bg-[var(--dark-bg)] text-sm gap-2 flex items-center ms-auto">
              <img src="/assets/explorer/more.svg" alt="" />
              More
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
