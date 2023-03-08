import { useState } from "react";
import { uploadPost } from "../api";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const Form = () => {
    const [file, setFile] = useState();
    const [password, setPassword] = useState();
    const [fileResponse, setFileResponse] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", file);
        if (password) data.append("password", password);
        if (data) {
            setIsLoading(true);
            await uploadPost(data)
                .then((res) => {
                    console.log(res);
                    setFileResponse(res?.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                });
        }
    };

    return (
        <>
            {isLoading && <Loader />}
            {fileResponse?.id ? (
                <div className="link-container">
                    Your file is uploaded to :
                    <Link to={fileResponse?.id}>{fileResponse?.name}</Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input className="file" type="file" onChange={handleFileChange} />
                    {/* <input className="file" type="file" onChange={handleFileChange} multiple /> */}
                    <p>{file ? file?.name : "Drag your files here or click in this area."}</p>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button type="submit">Share</button>
                </form>
            )}
        </>
    );
};

export default Form;
