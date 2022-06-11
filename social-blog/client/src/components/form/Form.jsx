import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

export default function Form({ currentId, setCurrentId }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector((state) =>
        currentId ? state.posts.posts.find((p) => p._id === currentId) : null
    );

    const user = JSON.parse(localStorage.getItem("profile"));

    const [postData, setPostData] = useState({
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
    });

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }
        clearForm();
    };

    const clearForm = () => {
        setCurrentId(null);
        setPostData({ title: "", message: "", tags: "", selectedFile: "" });
    };

    if (!user?.result.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Login to create a Post or like other posts
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? "Editing" : "Creating"} a Post</Typography>
                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    multiline
                    minRows={4}
                    maxRows={10}
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth
                >
                    Submit
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    fullWidth
                    onClick={clearForm}
                >
                    Clear
                </Button>
            </form>
        </Paper>
    );
}
