import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import NotFound from "./components/NotFound";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Form />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
