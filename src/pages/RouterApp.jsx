import React from "react";
import UserLayout from "../layout/client/UserLayout";
import Home from "./client/Home";
import Login from "./auth/Login";
import Profile from "./profile/Profile";
import Partners from "./partners/Partners";
import Game from "./game/Game";
import City from "./game/City";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";

const RouterApp = () => {
  const location = useLocation();
  return (
    <div>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          {/* Main layout with header and footer */}
          <Route
            path="/"
            element={
              <div className="bg-[#e3e3db] min-h-screen relative">
                <div className="relative z-10">
                  <UserLayout />
                </div>
              </div>
            }
          >
            <Route index element={<Home />} />
          </Route>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/game" element={<Game />} />
          <Route path="/game/city" element={<City />} />
          
          {/* Auth routes without layout */}
          
          {/* Profile route without the main layout */}
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default RouterApp;
