import { LeftSection, PostSection, RightSection } from "../../components";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <LeftSection />
      <PostSection />
      <RightSection />
    </div>
  );
};

export default Home;
