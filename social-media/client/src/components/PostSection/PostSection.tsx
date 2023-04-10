import "./PostSection.css";
import { Posts, PostShare } from "@/components";

const PostSection = () => {
  return (
    <div className="post-section">
      <PostShare />
      <Posts />
    </div>
  );
};

export default PostSection;
