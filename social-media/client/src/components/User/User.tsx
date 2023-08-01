import { useDispatch, useSelector } from "react-redux";
import "./User.css";
import { useState } from "react";
import { followUser, unFollowUser } from "@/apis/user";
import { unFollowUser as unFollow, followUser as follow } from "@/feature/authSlice";

const User = ({ user }: any) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state: any) => state.auth.authData);
  const [following, setFollowing] = useState<boolean>(user.followers.includes(loggedUser.user._id));

  const handleFollow = () => {
    if (following) {
      unFollowUser(user._id, loggedUser.user._id);
      dispatch(unFollow(user._id));
    } else {
      followUser(user._id, loggedUser.user._id);
      dispatch(follow(user._id));
    }
    setFollowing((prev) => !prev);
  };

  return (
    <div className="user">
      <div>
        <img
          src={
            user.profilePicture
              ? import.meta.env.VITE_PUBLIC_FOLDER + user.profilePicture
              : "/profile-default.png"
          }
          alt="profile"
          className="user-img"
        />
        <div className="name">
          <span>{user.fullName}</span>
          <span>@{user.username}</span>
        </div>
      </div>
      <button
        className={`button ${following ? "follow-button un-follow-button" : "follow-button"}`}
        onClick={handleFollow}
      >
        {following ? "Following" : "Follow"}
      </button>
    </div>
  );
};

export default User;
