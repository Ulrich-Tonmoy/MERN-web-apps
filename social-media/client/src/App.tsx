import { Auth, Home, Profile } from "@/pages";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

const App = () => {
  const user = useSelector((state: any) => state.auth.authData);

  return (
    <div className="app">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/auth" />} />
        <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
