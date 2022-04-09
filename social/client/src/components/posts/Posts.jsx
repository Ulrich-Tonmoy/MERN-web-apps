import useStyles from "./styles";
import Post from "./post/Post";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";

export default function Posts({ setCurrentId }) {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts);

    console.log(posts);

    return !posts.length ? (
        <CircularProgress />
    ) : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts.map((post) => (
                <Grid key={posts._id} type="item" item xs={12} sm={6}>
                    <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
            ))}
        </Grid>
    );
}
