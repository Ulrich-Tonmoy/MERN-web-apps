import { AiFillHome, AiOutlineBell, AiOutlineMessage, AiOutlineSetting } from "react-icons/ai";
import "./RightSection.css";
import { TrendCard } from "..";
import { useState } from "react";
import { ShareModal } from "..";

const RightSection = () => {
  const [modalOpened, setModalOpened] = useState<Boolean>(false);

  return (
    <div className="right-section">
      <div className="nav-icons">
        <AiFillHome className="nav-icon" style={{ color: "#f99827" }} />
        <AiOutlineSetting className="nav-icon" />
        <AiOutlineBell className="nav-icon" />
        <AiOutlineMessage className="nav-icon" />
      </div>
      <TrendCard />
      <button className="button right-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSection;