import { FollowersCard, ProfileCard, SearchSection } from "@/components";
import "./LeftSection.css";

const LeftSection = () => {
  return (
    <div className="left-section">
      <SearchSection />
      <ProfileCard />
      <FollowersCard />
    </div>
  );
};

export default LeftSection;
