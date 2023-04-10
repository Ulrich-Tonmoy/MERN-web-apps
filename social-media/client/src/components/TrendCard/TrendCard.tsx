import { TrendData } from "@/data/TrendData";
import "./TrendCard.css";

const TrendCard = () => {
  return (
    <div className="trend-card">
      <h3>Trends for you</h3>
      {TrendData.map((trend, i) => {
        return (
          <div className="trend" key={i}>
            <span>#{trend.name}</span>
            <span>{trend.shares}k shares</span>
          </div>
        );
      })}
    </div>
  );
};

export default TrendCard;
