import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./Auth.css";
import { useState, ChangeEvent, SyntheticEvent } from "react";

interface InitialState {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPass: string;
}

const Auth = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPass: "",
  };
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmPass, setConfirmPass] = useState(true);
  const [data, setData] = useState<InitialState>(initialState);

  const resetForm = () => {
    setData(initialState);
    setConfirmPass(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    setConfirmPass(true);
    e.preventDefault();
    console.log(data);
    if (isSignUp) {
      data.password === data.confirmPass
        ? // dispatch(signUp(data, navigate))
          setConfirmPass(true)
        : setConfirmPass(false);
    }
    // else {
    //   dispatch(logIn(data, navigate));
    // }
  };

  return (
    <div className="auth">
      <div className="auth-left">
        <img src="/logo.png" alt="logo" />
        <div className="web-name">
          <h1>Social Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      <div className="auth-right">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign Up" : "Log In"}</h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="auth-input"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="auth-input"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
              />
            </div>
          )}
          <div>
            <input
              type="text"
              className="auth-input"
              name="username"
              placeholder="Usernames"
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              className="auth-input"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                type="password"
                className="auth-input"
                name="confirmPass"
                placeholder="Confirm Password"
                value={data.confirmPass}
                onChange={handleChange}
              />
            )}
          </div>
          <span
            style={{
              color: "red",
              fontSize: "13px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Confirm password is not same
          </span>
          <div>
            <span style={{ fontSize: "12px" }}>
              {isSignUp ? (
                <>
                  Already have an account.{" "}
                  <span
                    className="auth-link"
                    onClick={() => {
                      resetForm();
                      setIsSignUp((prev) => !prev);
                    }}
                  >
                    Login!
                  </span>
                </>
              ) : (
                <>
                  Don't have an account.{" "}
                  <span
                    className="auth-link"
                    onClick={() => {
                      resetForm();
                      setIsSignUp((prev) => !prev);
                    }}
                  >
                    Sign up!
                  </span>
                </>
              )}
            </span>
          </div>
          <button className="button auth-button" type="submit">
            {isSignUp ? "SignUp" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
