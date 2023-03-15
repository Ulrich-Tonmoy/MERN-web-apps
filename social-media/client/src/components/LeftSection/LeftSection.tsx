import { FollowersCard, ProfileCard, SearchSection } from "..";
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
