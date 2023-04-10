import { BsSearch } from "react-icons/bs";
import "@/components/SearchSection/SearchSection.css";

const SearchSection = () => {
  return (
    <div className="search-section">
      <img src="/logo.png" alt="logo" />
      <div className="search">
        <input type="text" placeholder="#Explore" />
        <div className="search-icon">
          <BsSearch />
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
