import { Grow, Container, Grid, Paper } from "@material-ui/core";
import Form from "./../../components/form/Form";
import Posts from "./../../components/posts/Posts";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getPosts } from "./../../actions/posts";
import Pagination from "../../components/Pagination";

export default function Home() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Grow in>
            <Container>
                <Grid
                    className={classes.mainContainer}
                    container
                    justifyContent="space-between"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper className={classes.pagination} elevation={6}>
                            <Pagination />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}
