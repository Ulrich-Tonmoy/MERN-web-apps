import { BsCardImage } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import { AiOutlinePlayCircle, AiOutlineClose } from "react-icons/ai";
import "./PostShare.css";
import { ChangeEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PostShare = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState<File | null>(null);
  const [desc, setDesc] = useState<string>("");
  const imageRef = useRef<HTMLInputElement>(null);
  const { user } = useSelector((state: any) => state.auth.authData);

  const onImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newPost: any = {
      userId: user._id,
      desc,
    };
    if (image) {
      const data = new FormData();
      const filename = crypto.randomUUID() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = data;
      console.log(newPost);
      try {
        // dispatch(uploadImage(newPost));
      } catch (error) {
        console.log(error);
      }
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
          <button className="button post-share__button" onClick={handleSubmit}>
            Share
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
