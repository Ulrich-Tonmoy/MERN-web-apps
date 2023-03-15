import { LeftSection, PostSection } from "../../components";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <LeftSection />
      <PostSection />
      <div className="right-bar">Right</div>
    </div>
  );
};

export default Home;
