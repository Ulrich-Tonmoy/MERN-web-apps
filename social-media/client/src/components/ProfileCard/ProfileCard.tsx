import { useSelector } from "react-redux";
import "./ProfileCard.css";
import { Link, useLocation } from "react-router-dom";

const ProfileCard = () => {
  const { user } = useSelector((state: any) => state.auth.authData);
  const { posts } = useSelector((state: any) => state.post);
  const imageServer = import.meta.env.VITE_PUBLIC_FOLDER;

  const path = useLocation().pathname;

  return (
    <div className="profile-card">
      <div className="profile-images">
        <img
          src={user.coverPicture ? imageServer + user.coverPicture : "/cover-default.png"}
          alt="cover"
        />
        <img
          src={user.profilePicture ? imageServer + user.profilePicture : "/profile-default.png"}
          alt="profile"
        />
      </div>
      <div className="profile-name">
        <span>{user.fullName}</span>
        <span>{user?.worksAt ?? "Write about yourself."}</span>
      </div>
      <div className="follow-status">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.followings.length}</span>
            <span>Followings</span>
          </div>
          {path !== "/" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{posts.filter((p: any) => p.userId === user._id).length}</span>
                <span>
                  {posts.filter((p: any) => p.userId === user._id).length < 2 ? "Post" : "Posts"}
                </span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {path !== "/" ? (
        ""
      ) : (
        <span>
          <Link to={`profile/${user._id}`}>My Profile</Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
