import { Button, TextField, Typography } from "@material-ui/core";
import useStyles from "./styles";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const commentsRef = useRef();

    const user = JSON.parse(localStorage.getItem("profile"));
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState("");

    const handleComment = async () => {
        const newComment = `${user?.result?.name}: ${comment}`;
        const updatedComments = await dispatch(commentPost(newComment, post._id));
        setComments(updatedComments);
        setComment("");

        commentsRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">
                        Comments
                    </Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong>{c.split(":")[0]} :</strong>
                            {c.split(":")[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {user?.result?.name && (
                    <div style={{ width: "70%" }}>
                        <Typography gutterBottom variant="h6">
                            Write a comment
                        </Typography>
                        <TextField
                            fullWidth
                            minRows={4}
                            maxRows={8}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button
                            style={{ marginTop: "10px" }}
                            disabled={!comment}
                            variant="contained"
                            color="primary"
                            onClick={handleComment}
                        >
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentSection;
