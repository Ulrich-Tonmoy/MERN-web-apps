import { Followers } from "@/data/FollowersData";
import "@/components/FollowersCard/FollowersCard.css";

const FollowersCard = () => {
  return (
    <div className="followers-card">
      <h3>Who are following you</h3>
      {Followers.map((follower, i) => {
        return (
          <div key={i} className="follower">
            <div>
              <img src={follower.img} alt="profile" className="follower-img" />
              <div className="name">
                <span>{follower.name}</span>
                <span>@{follower.username}</span>
              </div>
            </div>
            <button className="button follow-button">Follow</button>
          </div>
        );
      })}
    </div>
  );
};

export default FollowersCard;
