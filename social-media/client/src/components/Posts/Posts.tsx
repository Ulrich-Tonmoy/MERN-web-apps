import { PostsData } from "../../data/PostsData";
import { Post } from "./Post/Post";
import "./Posts.css";

const Posts = () => {
  return (
    <div className="posts">
      {PostsData?.map((post, i) => {
        return <Post key={i} data={post} />;
      })}
    </div>
  );
};

export default Posts;
