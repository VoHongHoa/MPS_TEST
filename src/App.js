import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import DashLayout from "./Common/DashLayout";
import Layout from "./Common/Layout";
import Login from "./Views/Login/Login";
import React from "react";
import { useSelector } from "react-redux";
import PrivateRoute from "./Routes/PrivateRoute";
import LogoutWrap from "./Views/Logout/LogoutWrap";
import FBManagementPage from "./Views/FBManagement/FBManagementPage";
import PagesManagement from "./Views/FBManagement/MainFuntion/PagesManagement/PagesManagement/PagesManagement";
import BlogsManagementPage from "./Views/FBManagement/MainFuntion/BlogsManagement/BlogsManagement/BlogsManagement";
function App() {
  const isLogin = useSelector((state) => state.user.isLogin);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={isLogin ? <Navigate to={"dash"} /> : <Login />} />
        <Route
          path="log-out"
          element={
            <PrivateRoute>
              <LogoutWrap>
                <Login />
              </LogoutWrap>
            </PrivateRoute>
          }
        />
        {/* Start dash route */}
        <Route
          path="dash"
          element={
            <PrivateRoute>
              <DashLayout />
            </PrivateRoute>
          }
        >
          <Route path="facebook-management">
            <Route index element={<FBManagementPage />} />
            <Route path="pages" element={<PagesManagement />} />
            <Route path="blogs" element={<BlogsManagementPage />} />
          </Route>
        </Route>
        {/* End dash route */}
      </Route>
    </Routes>
  );
}

export default App;
