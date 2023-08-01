import "./Auth.css";
import { useState, ChangeEvent, SyntheticEvent } from "react";
import CustomInput from "@/components/CustomInput/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { authStart, authSuccess, authFail } from "@/feature/authSlice";
import { signUp, logIn } from "@/apis/auth";

interface InitialState {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPass: string;
}

const Auth = () => {
  const initialState = {
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  };
  const { loading, error } = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmPass, setConfirmPass] = useState(true);
  const [formData, setFormData] = useState<InitialState>(initialState);

  const resetForm = () => {
    setFormData(initialState);
    setConfirmPass(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    setConfirmPass(true);
    e.preventDefault();
    if (isSignUp) {
      if (formData.password === formData.confirmPass) {
        dispatch(authStart());
        try {
          const { data } = await signUp(formData);
          dispatch(authSuccess(data));
        } catch (error: any) {
          console.log(error.response.data);
          dispatch(authFail(error.response.data));
        }
      } else setConfirmPass(false);
    } else {
      dispatch(authStart());
      try {
        const { data } = await logIn(formData);
        dispatch(authSuccess(data));
      } catch (error: any) {
        console.log(error.response.data);
        dispatch(authFail(error.response.data));
      }
    }
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
          <div>
            {isSignUp ? (
              <>
                <CustomInput
                  type="text"
                  placeholder="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required={true}
                />
                <CustomInput
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required={true}
                />
              </>
            ) : (
              <CustomInput
                type="text"
                placeholder="Username or Email"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required={true}
              />
            )}
          </div>
          {isSignUp && (
            <div>
              <CustomInput
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required={true}
              />
            </div>
          )}
          <div>
            <CustomInput
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={true}
            />
            {isSignUp && (
              <CustomInput
                type="password"
                placeholder="Confirm Password"
                name="confirmPass"
                value={formData.confirmPass}
                onChange={handleChange}
                required={true}
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
          {error && (
            <span
              style={{
                color: "red",
                fontSize: "20px",
                alignSelf: "flex-center",
                display: "block",
              }}
            >
              {error}
            </span>
          )}
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
          <button className="button auth-button" type="submit" disabled={loading}>
            {loading ? "Loading..." : isSignUp ? "SignUp" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
