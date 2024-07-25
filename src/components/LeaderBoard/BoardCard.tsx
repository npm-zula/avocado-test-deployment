import React from "react";

type Props = {
  image: string;
  name: string;
  bio: string;
  guac: number;
};

const BoardCard = (props: Props) => {
  return (
    <div className="w-[100%]">
      <div className="flex w-full items-center transition gap-3 mb-3 hover:bg-[#27272A] rounded-md">
        <div className="border-4 max-w-[60px]  max-h-[60px] w-[5vw] h-[5vw]  rounded-xl border-[#1B1F20]">
          <img
            src={props.image || "/assets/explorer/Rectangle2.png"}
            className="w-full h-full"
            style={{ objectFit: "cover" }}
            alt=""
          />
        </div>
        <div className="flex-1">
          <p className="text_lg  font-regular">
            {props.name}
            <span className="ml-2">🥑 {props.guac}</span>
          </p>
          <div className="flex items-center gap-2">
            <p className="text_sm    mt-1 font-regular text-[#97999A]">
              {props.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
