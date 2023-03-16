import { PostSection, ProfileCard, ProfileLeft, RightSection } from "../../components";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile">
      <ProfileLeft />
      <div className="profile-center">
        <ProfileCard />
        <PostSection />
      </div>
      <RightSection />
    </div>
  );
};

export default Profile;
