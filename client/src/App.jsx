import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostJob from "./components/Job/PostJob";
import NotFound from "./components/NotFound/NotFound";
import MyJobs from "./components/Job/MyJobs";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/user/getuser", { withCredentials: true })
      .then((res) => { setUser(res.data.user); setIsAuthorized(true); })
      .catch(() => setIsAuthorized(false));
  }, [isAuthorized]);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen font-fb">
        <Navbar />
        <Routes>
          <Route path="/login"           element={<Login />} />
          <Route path="/register"        element={<Register />} />
          <Route path="/"                element={<Home />} />
          <Route path="/job/getall"      element={<Jobs />} />
          <Route path="/job/:id"         element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/job/post"        element={<PostJob />} />
          <Route path="/job/me"          element={<MyJobs />} />
          <Route path="*"                element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#fff",
              color: "#050505",
              border: "1px solid #CED0D4",
              fontFamily: '"Segoe UI", system-ui, sans-serif',
              fontSize: "14px",
            },
            success: { iconTheme: { primary: "#42B72A", secondary: "#fff" } },
            error:   { iconTheme: { primary: "#E41E3F", secondary: "#fff" } },
          }}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
