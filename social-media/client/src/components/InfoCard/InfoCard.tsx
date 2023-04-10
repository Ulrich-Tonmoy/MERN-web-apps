import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import "./InfoCard.css";
import { ProfileModal } from "@/components";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState<Boolean>(false);
  return (
    <div className="info-card">
      <div className="info-head">
        <h4>Your Info</h4>
        <div>
          <AiOutlineEdit
            style={{ width: "2rem", height: "1.5rem" }}
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
        </div>
      </div>
      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>in Relationship</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>Multan</span>
      </div>
      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>Private Limited</span>
      </div>
      <button className="button logout-button">Logout</button>
    </div>
  );
};

export default InfoCard;
