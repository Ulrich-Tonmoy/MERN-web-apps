import { ProfileCard, SearchSection } from "..";
import "./LeftSection.css";

const LeftSection = () => {
  return (
    <div className="left-section">
      <SearchSection />
      <ProfileCard />
    </div>
  );
};

export default LeftSection;
