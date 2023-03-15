import "./ProfileCard.css";

const ProfileCard = () => {
  const ProfilePage = true;

  return (
    <div className="profile-card">
      <div className="profile-images">
        <img src="/cover-default.png" alt="cover" />
        <img src="/profile-default.png" alt="profile" />
      </div>
      <div className="profile-name">
        <span>Ulrich Tonmoy</span>
        <span>MERN Stack Developer</span>
      </div>
      <div className="follow-status">
        <hr />
        <div>
          <div className="follow">
            <span>5,987</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>550</span>
            <span>Followings</span>
          </div>
          {ProfilePage && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>3</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {ProfilePage ? "" : <span>My Profile</span>}
    </div>
  );
};

export default ProfileCard;
