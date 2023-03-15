import { LeftSection } from "../../components/index";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <LeftSection />
      <div className="center">Center</div>
      <div className="right-bar">Right</div>
    </div>
  );
};

export default Home;
