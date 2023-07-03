/* eslint-disable react-hooks/exhaustive-deps */
import { Post } from "@/components/Posts/Post/Post";
import "./Posts.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTimelinePosts } from "@/apis/post";
import { getTimelinePostSuccess, postApiFail, postApiStart } from "@/feature/postSlice";

const Posts = () => {
  const { user } = useSelector((state: any) => state.auth.authData);
  const { posts, postLoading } = useSelector((state: any) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        dispatch(postApiStart());
        const { data } = await getTimelinePosts(user._id);
        dispatch(getTimelinePostSuccess(data));
      } catch (error: any) {
        console.log(error.response.data);
        dispatch(postApiFail(error.response.data));
      }
    })();
  }, []);

  return (
    <div className="posts">
      {postLoading
        ? "Fetching Posts..."
        : posts?.map((post: any, i: number) => {
            return <Post key={i} data={post} />;
          })}
    </div>
  );
};

export default Posts;
