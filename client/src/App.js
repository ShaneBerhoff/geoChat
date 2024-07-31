import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import AccessDenied from "./pages/AccessDenied";
import Chat from "./pages/Chat";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/chatroom" element={<Chat />} />
          <Route path="/access-denied" element={<AccessDenied />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
