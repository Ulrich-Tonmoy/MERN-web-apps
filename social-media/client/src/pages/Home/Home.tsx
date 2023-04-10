import { LeftSection, PostSection, RightSection } from "@/components";
import "@/pages/Home/Home.css";

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
