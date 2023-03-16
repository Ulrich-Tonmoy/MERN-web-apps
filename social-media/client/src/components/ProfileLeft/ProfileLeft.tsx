import "./ProfileLeft.css";
import { FollowersCard, InfoCard, SearchSection } from "..";

const ProfileLeft = () => {
  return (
    <div className="profile-left">
      <SearchSection />
      <InfoCard />
      <FollowersCard />
    </div>
  );
};

export default ProfileLeft;
