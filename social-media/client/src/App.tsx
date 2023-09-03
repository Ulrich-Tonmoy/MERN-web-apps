import { Auth, Home, Profile } from "@/pages";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import Chat from "./pages/Chat/Chat";

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
        <Route path="/chat" element={user ? <Chat /> : <Navigate to="/auth" />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
