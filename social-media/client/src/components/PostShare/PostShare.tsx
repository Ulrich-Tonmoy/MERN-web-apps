import { BsCardImage } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import { AiOutlinePlayCircle, AiOutlineClose } from "react-icons/ai";
import "./PostShare.css";
import { ChangeEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postApiStart, postApiFail, uploadSuccess } from "@/feature/postSlice";
import { post } from "@/apis/post";

const PostShare = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState<File | null>(null);
  const [desc, setDesc] = useState<string>("");
  const imageRef = useRef<HTMLInputElement>(null);
  const { postLoading, postError } = useSelector((store: any) => store.post);
  const { user } = useSelector((state: any) => state.auth.authData);

  const onImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const newPost = new FormData();
    newPost.append("userId", user._id);
    newPost.append("desc", desc);
    if (image) {
      const filename = crypto.randomUUID() + image.name;
      newPost.append("name", filename);
      newPost.append("file", image);
    }
    try {
      dispatch(postApiStart());
      const { data } = await post(newPost);
      dispatch(uploadSuccess(data));
      setImage(null);
      setDesc("");
    } catch (error: any) {
      console.log(error.response.data);
      dispatch(postApiFail(error.response.data));
    }
  };

  return (
    <div className="post-share">
      <img src="/profile-default.png" alt="profile" />
      <div>
        <textarea
          name="desc"
          rows={6}
          cols={50}
          placeholder="What's happening?"
          style={{ resize: "none" }}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="post-options">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current?.click()}
          >
            <BsCardImage /> Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <AiOutlinePlayCircle /> Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <GoLocation /> Location
          </div>
          <div className="option" style={{ color: "var(--schedule)" }}>
            <SlCalender /> Schedule
          </div>
          <button
            className="button post-share__button"
            onClick={handleSubmit}
            disabled={postLoading || (!image && !desc)}
          >
            {postLoading ? "Uploading..." : "Share"}
          </button>
          <div style={{ display: "none" }}>
            <input type="file" name="img" ref={imageRef} onChange={onImageChange} />
          </div>
        </div>
        {image && (
          <div className="preview-image">
            <AiOutlineClose onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
