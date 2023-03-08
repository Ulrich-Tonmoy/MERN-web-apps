import { BrowserRouter, Route, Routes } from "react-router-dom";
import Download from "./components/Download";
import Form from "./components/Form";
import NotFound from "./components/NotFound";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Form />} />
                <Route path="/:id" exact element={<Download />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
