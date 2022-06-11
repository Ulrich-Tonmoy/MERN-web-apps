import { Grow, Container, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core";
import Form from "./../../components/form/Form";
import Posts from "./../../components/posts/Posts";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getPosts, getPostsBySearch } from "./../../actions/posts";
import Pagination from "../../components/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

export default function Home() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get("page") || 1;
    const searchQuery = query.get("searchQuery");

    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);

    const handleKeyPress = (e) => {
        if (e.keycode === 13) {
            searchPost();
        }
    };

    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (tag) => setTags(tags.filter((t) => t !== tag));

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
            navigate(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);
        } else {
            navigate("/");
        }
    };

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid
                    className={classes.gridContainer}
                    container
                    justifyContent="space-between"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12} sm={6} md={8}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search Post"
                                fullWidth
                                value={search}
                                onKeyPress={handleKeyPress}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <ChipInput
                                style={{ margin: "10px 0" }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button
                                onClick={searchPost}
                                className={classes.searchButton}
                                variant="contained"
                                color="primary"
                            >
                                Search
                            </Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {!searchQuery && !tags.length && (
                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
