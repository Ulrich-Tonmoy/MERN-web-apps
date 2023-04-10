import { PostsData } from "@/data/PostsData";
import { Post } from "@/components/Posts/Post/Post";
import "@/components/Posts/Posts.css";

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
