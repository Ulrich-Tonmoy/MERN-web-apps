import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineBell, AiFillMessage, AiOutlineSetting } from "react-icons/ai";

const NavIcons = () => {
  return (
    <div className="right-section">
      <div className="nav-icons">
        <Link to="/">
          <AiOutlineHome className="nav-icon" />
        </Link>
        <AiOutlineSetting className="nav-icon" />
        <AiOutlineBell className="nav-icon" />
        <Link to="/chat">
          <AiFillMessage className="nav-icon" style={{ color: "#f99827" }} />
        </Link>
      </div>
    </div>
  );
};

export default NavIcons;
