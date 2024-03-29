import { AiFillHome, AiOutlineBell, AiOutlineMessage, AiOutlineSetting } from "react-icons/ai";
import "./RightSection.css";
import { useState } from "react";
import { ShareModal, TrendCard } from "@/components";
import { Link } from "react-router-dom";

const RightSection = () => {
  const [modalOpened, setModalOpened] = useState<Boolean>(false);

  return (
    <div className="right-section">
      <div className="nav-icons">
        <Link to="/">
          <AiFillHome className="nav-icon" style={{ color: "#f99827" }} />
        </Link>
        <AiOutlineSetting className="nav-icon" />
        <AiOutlineBell className="nav-icon" />
        <Link to="/chat">
          <AiOutlineMessage className="nav-icon" />
        </Link>
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
