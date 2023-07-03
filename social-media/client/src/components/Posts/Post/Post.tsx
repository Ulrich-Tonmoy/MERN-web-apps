import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineSend } from "react-icons/ai";
import "./Post.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { likePost } from "@/apis/post";

export const Post = ({ data }: any) => {
  const { user } = useSelector((state: any) => state.auth.authData);

  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);

  const handleLike = () => {
    setLiked((prev: any) => !prev);
    likePost(data._id, user._id);
    liked ? setLikes((prev: any) => prev - 1) : setLikes((prev: any) => prev + 1);
  };

  return (
    <div className="post">
      <img
        src={data.image ? import.meta.env.VITE_PUBLIC_FOLDER + data.image : ""}
        alt={data?.name}
      />
      <div className="post-react">
        {liked ? (
          <AiFillHeart
            className="post-react__icons"
            style={{ color: "#f99827" }}
            onClick={handleLike}
          />
        ) : (
          <AiOutlineHeart className="post-react__icons" onClick={handleLike} />
        )}
        <AiOutlineMessage className="post-react__icons" />
        <AiOutlineSend className="post-react__icons" />
      </div>
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} {parseInt(likes) < 2 ? "like" : "likes"}
      </span>
      <div className="detail">
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div>
    </div>
  );
};
