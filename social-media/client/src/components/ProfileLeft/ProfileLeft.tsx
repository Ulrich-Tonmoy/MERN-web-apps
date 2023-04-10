import "@/components/ProfileLeft/ProfileLeft.css";
import { FollowersCard, InfoCard, SearchSection } from "@/components";

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
