import { FollowersCard, ProfileCard, SearchSection } from "@/components";
import "@/components/LeftSection/LeftSection.css";

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
