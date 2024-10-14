import { useEffect, useContext } from "react";
import { ChatContext } from "../../Screens/ChatContext";

const PotentialChats = () => {
  const { potentialChats, createChat, userId, onlineUsers } =
    useContext(ChatContext);

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    secondId: string
  ) => {
    event.stopPropagation();

    if (userId) {
      createChat(userId, secondId);
    } else {
      console.error("User ID is null");
    }
  };

  return (
    <div className="all-users">
      {potentialChats &&
        potentialChats.map((u, index) => (
          <div
            className="single-user"
            key={index}
            onClick={(event) => handleClick(event, u._id)}
          >
            <img src={u.profile_picture} alt={u.firstname} />
            <span
              className={
                onlineUsers?.some((user) => user?.userId === u?._id)
                  ? "user-online"
                  : ""
              }
            ></span>
          </div>
        ))}
    </div>
  );
};

export default PotentialChats;
