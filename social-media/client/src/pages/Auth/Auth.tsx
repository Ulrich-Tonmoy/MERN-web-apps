import { Login } from "@/components";
import "@/pages/Auth/Auth.css";

const Auth = () => {
  return (
    <div className="auth">
      <div className="auth-left">
        <img src="/logo.png" alt="logo" />
        <div className="web-name">
          <h1>Social Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      <Login />
    </div>
  );
};

export default Auth;
