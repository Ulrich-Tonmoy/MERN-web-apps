import { getUser } from "@/apis/user";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Conversation = ({ data, currentUser, online }: any) => {
  const [userData, setUserData] = useState<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = data.members.find((id: any) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
        dispatch({ type: "SAVE_USER", data: data });
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);
  return (
    <>
      <div className="follower conversation">
        <div style={{ display: "flex" }}>
          {online && <div className="online-dot"></div>}
          <img
            src={
              userData?.profilePicture
                ? import.meta.env.VITE_PUBLIC_FOLDER + userData.profilePicture
                : "/profile-default.png"
            }
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px", marginRight: "5px" }}
          />
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>{userData?.fullName}</span>
            <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
