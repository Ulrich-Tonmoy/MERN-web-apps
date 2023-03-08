import { useEffect, useState } from "react";
import { fetchFile, fetchFileWithPassword } from "../api";
import Loader from "./Loader";
import { useParams } from "react-router-dom";

const Download = () => {
    let { id } = useParams();

    const [password, setPassword] = useState("");
    const [isPassword, setIsPassword] = useState();
    const [fileResponse, setFileResponse] = useState();
    const [errMsg, setErrMsg] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const getFile = async () => {
        await fetchFile(id)
            .then((res) => {
                console.log(res);
                setIsPassword(res?.data.password || false);
                setFileResponse(res?.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setErrMsg(err?.response?.data?.err);
                setIsLoading(false);
            });
    };

    const downloadFile = async () => {
        setIsLoading(true);
        await fetchFileWithPassword(id, password)
            .then((res) => {
                console.log(res);

                if (!(res?.data instanceof Blob)) return;
                const blob = new Blob([res?.data]);
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = fileResponse?.fileName;
                link.click();

                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setErrMsg(err?.response?.data?.err);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        setIsLoading(true);
        getFile();
    }, []);

    return (
        <>
            {isLoading && <Loader />}

            <div className="download-container">
                {errMsg && <div style={{ color: "red", fontSize: "26px" }}>{errMsg}</div>}
                {isPassword && (
                    <div>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                )}
                {fileResponse?.id && (
                    <>
                        <div>
                            <p>{fileResponse?.fileName}</p>
                        </div>
                        <div>
                            <button onClick={() => downloadFile()}>Download</button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Download;
