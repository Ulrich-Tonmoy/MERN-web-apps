import useStyles from "./styles";
import Post from "./post/Post";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";

export default function Posts({ setCurrentId }) {
    const classes = useStyles();
    const { posts, isLoading } = useSelector((state) => state.posts);

    if (!posts.length && !isLoading) return "No Posts to Show!!";

    return isLoading ? (
        <CircularProgress />
    ) : (
        <Grid className={classes.container} container alignItems="stretch" spacing={2}>
            {posts.map((post) => (
                <Grid key={post._id} type="item" item xs={12} sm={12} md={6} lg={4}>
                    <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
            ))}
        </Grid>
    );
}
