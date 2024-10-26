import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import Welcome from "./pages/Welcome";
import AccessDenied from "./pages/AccessDenied";
import Chat from "./pages/Chat";
import About from "./pages/About";
import { HelmetProvider } from "react-helmet-async";
import Countdown from "./pages/Countdown";

function App() {
  const launchDate = new Date(2024, 9, 28, 12, 0, 0); 
  const [isLaunched, setIsLaunched] = useState(false);

  return (
    <HelmetProvider>
      <div className="selection:text-primary-darker selection:bg-primary-dark">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/chatroom" element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            } />
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
        {!isLaunched && <Countdown onLaunch={() => setIsLaunched(true)} launchDate={launchDate} />}
      </div>
    </HelmetProvider>
  );
}

export default App;