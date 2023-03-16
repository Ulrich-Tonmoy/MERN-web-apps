const Login = () => {
  return (
    <div className="auth-right">
      <form className="info-form auth-form">
        <h3>Log In</h3>
        <div>
          <input type="text" placeholder="Username" className="info-input" name="username" />
        </div>
        <div>
          <input type="password" className="info-input" placeholder="Password" name="password" />
        </div>
        <div>
          <span style={{ fontSize: "12px" }}>Don't have an account Sign up</span>
          <button className="button info-button">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
