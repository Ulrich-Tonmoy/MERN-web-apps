import social from "./assets/social.png";
import { AppBar, Container, Grid, Grow, Typography } from "@material-ui/core";
import Posts from "./components/posts/Posts";
import Form from "./components/form/Form";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "./actions/posts";

function App() {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">
                    Social
                </Typography>
                <img className={classes.image} src={social} alt="social" height="60" />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default App;
