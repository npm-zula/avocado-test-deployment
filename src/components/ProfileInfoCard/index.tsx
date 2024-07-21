import React from "react";
import "../../globals.css";
import { IUser } from "@/types";

import { getCurrentUser } from "@/lib/supabase/api/userAuth";
import { get } from "http";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "This is the Default Bio",
  guac: 0,
};

const ProfileInfoCard = () => {
  const [user, setUser] = React.useState<IUser>(INITIAL_USER);

  React.useEffect(() => {
    const getUser = async () => {
      const newUser: IUser | null = await getCurrentUser();

      if (newUser) {
        setUser({
          id: newUser?.id,
          name: newUser.name,
          username: newUser.username,
          email: newUser.email,
          imageUrl: newUser.imageUrl,
          bio: newUser.bio,
          guac: newUser.guac,
        });
      }
    };

    getUser();
  }, []);

  return (
    <div className="w-full  bg-[var(--light-bg)]  rounded-lg mt-3 p-4 box-border">
      {/* profile card start */}
      <div className="profile_card_wrap ">
        <img
          src="/assets/explorer/sideProfile.png"
          className="min-h-[140px] h-[10vw] w-full"
          alt=""
        />
        <div className="w-full relative top-[-35px] flex flex-col gap-3">
          <div className="w-full flex items-center justify-around  ">
            {/* <div>
              <p className="text-[14px] mt-1 font-bold text-center">12K</p>
              <p className="text-[12px] text-[#B2B4B5] mt-1 font-regular text-center ">
                Follower
              </p>
            </div> */}

            <div>
              <div className="card_profile_img  overflow-hidden ">
                <div
                  className="bg-cover bg-center bg-no-repeat bg-origin-border w-[70px] h-[70px] "
                  style={{
                    backgroundImage: `url(/assets/explorer/sideProfile.png)`,
                  }}
                />
              </div>
              <p className="text-[14px] mt-1 font-bold text-center">
                {user.name}
              </p>
              <p className="text-[12px] text-[#B2B4B5] mt-1 font-regular text-center">
                @{user.username}
              </p>
            </div>
            {/* <div>
              <p className="text-[14px] mt-1 font-bold text-center">12K</p>
              <p className="text-[12px] text-[#B2B4B5] mt-1 font-regular text-center ">
                Following
              </p>
            </div> */}
          </div>
          <p className="text-[12px]  mt-1 font-bold text-center w-[80%] mx-auto ">
            {" "}
            🚀 Guac Score: {user.guac}{" "}
          </p>
          <p className="text-[12px]  mt-1 font-regular text-center w-[80%] mx-auto ">
            {" "}
            {user.bio}{" "}
          </p>
          <button className="myProfile_btn">My Profile &#129122;</button>
        </div>
      </div>
      {/* profile card end here */}
      <div>
        <p className="text-[14px] font-bold my-4">Communities</p>
        {[1, 2, 3].map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center transition gap-3 mb-3 hover:bg-[#27272A]  hover:p-1 rounded-md">
              <div className="w-[60px] h-[60px] border-4 rounded-xl border-[#1B1F20]">
                <img
                  src="/assets/explorer/Rectangle2.png"
                  className="w-full h-full"
                  style={{ objectFit: "cover" }}
                  alt=""
                />
              </div>
              <div>
                <p className="text-[14px]  font-regular">
                  UX designers community
                </p>
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/explorer/friendsprofile.svg"
                    width={16}
                    height={16}
                    alt=""
                  />
                  <p className="text-[12px]  mt-1 font-regular text-[#97999A]">
                    32 your friends are in
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileInfoCard;
