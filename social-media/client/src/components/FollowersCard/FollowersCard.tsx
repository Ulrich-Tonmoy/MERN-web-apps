import "./FollowersCard.css";
import { User } from "@/components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllUser } from "@/apis/user";

const FollowersCard = () => {
  const [users, setUsers] = useState<any>([]);
  const user = useSelector((state: any) => state.auth.authData);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllUser();
        setUsers(data);
      } catch (error: any) {
        console.log(error.response.data);
      }
    })();
  }, []);

  return (
    <div className="followers-card">
      <h3>People you may know</h3>
      {users.map((data: any, i: number) => {
        return data._id !== user.user._id && <User user={data} key={i} />;
      })}
    </div>
  );
};

export default FollowersCard;
