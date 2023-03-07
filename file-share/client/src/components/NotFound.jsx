import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div class="notfound-container">
            <div class="notfound">
                <div class="notfound-404">
                    <h1>404</h1>
                    <h2>Page not found</h2>
                </div>
                <Link to="/">Homepage</Link>
            </div>
        </div>
    );
};

export default NotFound;
