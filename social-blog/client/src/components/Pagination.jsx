import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";

import { getPosts } from "../actions/posts";
import useStyles from "./styles";

export default function Paginate({ page }) {
    const { numberOfPages } = useSelector((state) => state.posts);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if (page) dispatch(getPosts(page));
    }, [page, dispatch]);

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    );
}
