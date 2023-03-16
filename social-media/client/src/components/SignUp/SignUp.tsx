const SignUp = () => {
  return (
    <div className="auth-right">
      <form className="info-form auth-form">
        <h3>Sign up</h3>
        <div>
          <input type="text" placeholder="First Name" className="info-input" name="firstName" />
          <input type="text" placeholder="Last Name" className="info-input" name="lastName" />
        </div>
        <div>
          <input type="text" className="info-input" name="username" placeholder="Usernames" />
        </div>
        <div>
          <input type="text" className="info-input" name="password" placeholder="Password" />
          <input
            type="text"
            className="info-input"
            name="confirmPass"
            placeholder="Confirm Password"
          />
        </div>
        <div>
          <span style={{ fontSize: "12px" }}>Already have an account. Login!</span>
        </div>
        <button className="button info-button" type="submit">
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignUp;
