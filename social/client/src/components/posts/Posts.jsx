import useStyles from "./styles";
import Post from "./post/Post";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";

export default function Posts() {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts);

    console.log(posts);

    return !posts.length ? (
        <CircularProgress />
    ) : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts.map((post) => (
                <Grid type="item" key={posts._id} item xs={12} sm={6}>
                    <Post post={post} />
                </Grid>
            ))}
        </Grid>
    );
}
