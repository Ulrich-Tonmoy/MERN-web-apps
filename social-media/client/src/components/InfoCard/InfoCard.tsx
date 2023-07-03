/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import "./InfoCard.css";
import { ProfileModal } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "@/apis/user";
import { logOut } from "@/feature/authSlice";

const InfoCard = () => {
  const { user } = useSelector((state: any) => state.auth.authData);

  const dispatch = useDispatch();
  const params = useParams();

  const [userProfile, setUserProfile] = useState<any>({});
  const [modalOpened, setModalOpened] = useState<Boolean>(false);

  const handleLogout = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    (async () => {
      if (params.id === user._id) setUserProfile(user);
      else {
        const profile = await getUser(params.id);
        setUserProfile(profile);
      }
    })();
  }, [user]);

  return (
    <div className="info-card">
      <div className="info-head">
        <h4>Profile Info</h4>
        {params.id === user._id && (
          <div>
            <AiOutlineEdit
              style={{ width: "2rem", height: "1.5rem" }}
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
          </div>
        )}
      </div>
      <div className="info">
        <span>
          <b>Status : </b>
        </span>
        <span>{userProfile?.relationship ?? "Not available."}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in : </b>
        </span>
        <span>{userProfile?.livesIn ?? "Not available."}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at : </b>
        </span>
        <span>{userProfile?.worksAt ?? "Not available."}</span>
      </div>
      {params.id === user._id && (
        <button className="button logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default InfoCard;
