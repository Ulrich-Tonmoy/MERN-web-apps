import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineSend } from "react-icons/ai";
import "@/components/Posts/Post/Post.css";

export const Post = ({ data }: any) => {
  return (
    <div className="post">
      <img src={data?.img} alt={data?.name} />
      <div className="post-react">
        {data?.liked ? (
          <AiFillHeart className="post-react__icons" style={{ color: "#f99827" }} />
        ) : (
          <AiOutlineHeart className="post-react__icons" />
        )}
        <AiOutlineMessage className="post-react__icons" />
        <AiOutlineSend className="post-react__icons" />
      </div>
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>{data?.likes} likes</span>
      <div className="detail">
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div>
    </div>
  );
};
