import { BsCardImage } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import { AiOutlinePlayCircle, AiOutlineClose } from "react-icons/ai";
import "./PostShare.css";
import { ChangeEvent, useRef, useState } from "react";

export interface Image {
  image: string;
}

const PostShare = () => {
  const [image, setImage] = useState<Image | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const onImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };

  return (
    <div className="post-share">
      <img src="/profile-default.png" alt="profile" />
      <div>
        <input type="text" placeholder="What's happening?" />
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
          <button className="button post-share__button">Share</button>
          <div style={{ display: "none" }}>
            <input type="file" name="img" ref={imageRef} onChange={onImageChange} />
          </div>
        </div>
        {image && (
          <div className="preview-image">
            <AiOutlineClose onClick={() => setImage(null)} />
            <img src={image.image} alt="preview" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
