import useStyles from "./styles";
import { Avatar, Button, Container, Grid, Paper, Typography } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import Input from "./Input";
import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import Icon from "./icon";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../../actions/auth";
import { login } from "./../../actions/auth";

export default function Auth() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [passwordNotMatched, setPasswordNotMatched] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setPasswordNotMatched(true);
        } else {
            if (isSignUp) {
                dispatch(signup(form, navigate));
            } else {
                dispatch(login(form, navigate));
            }
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setPasswordNotMatched(false);
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: "AUTH", data: { result, token } });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const googleError = (error) => {
        console.log(error + "Error");
    };

    const switchMode = () => setIsSignUp((prevIsSignUp) => !prevIsSignUp);

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5">{isSignUp ? "Sign Up" : "Login"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <Input
                                name="fullName"
                                label="Full Name"
                                handleChange={handleChange}
                                type="text"
                                autoFocus
                            />
                        )}
                        <Input
                            name="email"
                            label="Email Address"
                            handleChange={handleChange}
                            type="email"
                        />
                        <Input
                            name="password"
                            label="Password"
                            handleChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignUp && (
                            <>
                                <Input
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    handleChange={handleChange}
                                    type={showPassword ? "text" : "password"}
                                />
                                {passwordNotMatched && (
                                    <Typography variant="h6" align="center" color="secondary">
                                        "Password and Confirm Password does not match please check
                                        and try again"
                                    </Typography>
                                )}
                            </>
                        )}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {isSignUp ? "Sign Up" : "Login"}
                    </Button>
                    <GoogleLogin
                        clientId="492233707733-43gsie7q6kuj91em1juqr2cn945lavju.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >
                                Login with Google
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid type="item">
                            <Button onClick={switchMode}>
                                {isSignUp
                                    ? "Already have an account? Login"
                                    : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}
