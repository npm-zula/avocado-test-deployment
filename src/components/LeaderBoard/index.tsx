import React from "react";
import "../../globals.css";

import { getLeaderBoardUsers } from "@/lib/supabase/api/users";
import { IUser } from "@/types";

import BoardCard from "./BoardCard";

import { Loader } from "../shared";

import { sort_filters } from "@/constants";

const LeaderBoard = () => {
  const [leaderBoardUsers, setLeaderBoardUsers] = React.useState<IUser[]>([]);
  const [sortFilter, setSortFilter] = React.useState<string>("descending");

  const fetchLeaderBoardUsers = async () => {
    setLeaderBoardUsers([]);
    const users = (await getLeaderBoardUsers(sortFilter)) || [];
    setLeaderBoardUsers(users);
  };

  React.useEffect(() => {
    fetchLeaderBoardUsers();
  }, [sortFilter]);

  return (
    <div>
      <div className="w-full">
        <div className="w-full flex flex-wrap mt-3 gap-3">
          {sort_filters?.map((item, index) => {
            return (
              <div
                onClick={() => {
                  setSortFilter(item.value);
                }}
                className={`px-5 capitalize cursor-pointer py-2 rounded-3xl text-md font-medium  ${
                  sortFilter === item.value
                    ? "bg-[#64D25F] text-[#000] "
                    : "bg-[var(--light-bg)] text-[#97999A]"
                } `}>
                {item.name}
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full  bg-[var(--light-bg)]  rounded-lg mt-3 p-4 box-border">
        {/* profile card end here */}
        <p className="text-xl font-bold my-4">LeaderBoard</p>

        {leaderBoardUsers.length === 0 ? (
          <Loader />
        ) : (
          <div>
            {leaderBoardUsers.map((user) => (
              <BoardCard
                key={user.id}
                image={user.imageUrl}
                name={user.name}
                bio={user.bio}
                guac={user.guac}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderBoard;
