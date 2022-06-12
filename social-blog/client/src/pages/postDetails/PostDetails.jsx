import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CircularProgress, Divider, Paper, Typography } from "@material-ui/core";
import moment from "moment";
import CommentSection from "./CommentSection";
import { useEffect } from "react";
import { getPost, getPostsBySearch } from "./../../actions/posts";

export default function PostDetails() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { post, posts, isLoading } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(getPost(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (post) {
            dispatch(getPostsBySearch({ search: "none", tags: post?.tags.join(",") }));
        }
    }, [post, dispatch]);

    if (!post) return null;

    if (isLoading)
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        );

    const recommendedPosts = posts?.filter(({ _id }) => _id !== post._id);

    const openPost = (_id) => {
        navigate(`/posts/${_id}`);
    };

    return (
        <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
            <div className={classes.imageSection}>
                <img
                    className={classes.media}
                    src={
                        post.selectedFile ||
                        "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                    }
                    alt={post.title}
                />
            </div>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">
                        {post.title}
                    </Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
                        {post.tags.map((tag) => (
                            <Link
                                key={tag}
                                to={`/tags/${tag}`}
                                style={{ textDecoration: "none", color: "#3f51b5" }}
                            >
                                {` #${tag} `}
                            </Link>
                        ))}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p">
                        {post.message}
                    </Typography>
                    <Typography variant="h6">
                        Created by:
                        <Link
                            to={`/creators/${post.name}`}
                            style={{ textDecoration: "none", color: "#3f51b5" }}
                        >
                            {` ${post.name}`}
                        </Link>
                    </Typography>
                    <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: "20px 0" }} />
                    <Typography variant="body1">
                        <strong>Realtime Chat - coming soon!</strong>
                    </Typography>
                    <Divider style={{ margin: "20px 0" }} />
                    <CommentSection post={post} />
                    <Divider style={{ margin: "20px 0" }} />
                </div>
            </div>
            {recommendedPosts?.length && (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">
                        You might also like:
                    </Typography>
                    <Divider />
                    <div className={classes.recommendedPosts}>
                        {recommendedPosts?.map(
                            ({ title, message, name, likes, selectedFile, _id }) => (
                                <Card
                                    raised
                                    elevation={6}
                                    style={{
                                        margin: "20px",
                                        padding: "10px",
                                        cursor: "pointer",
                                        maxWidth: "250px",
                                    }}
                                    onClick={() => openPost(_id)}
                                    key={_id}
                                >
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        style={{ fontWeight: 600 }}
                                    >
                                        {title}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle2">
                                        Created by: {name}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle2">
                                        {message.length > 70
                                            ? `${message.substring(0, 70)}...`
                                            : message}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1">
                                        Likes: {likes.length}
                                    </Typography>
                                    <img src={selectedFile} alt={title} width="200px" />
                                </Card>
                            )
                        )}
                    </div>
                </div>
            )}
        </Paper>
    );
}
