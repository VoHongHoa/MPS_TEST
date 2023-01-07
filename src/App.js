import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import DashLayout from "./Common/DashLayout";
import Layout from "./Common/Layout";
import CategoriesPage from "./Views/Products/Report/CategoriesPage";
import Homepage from "./Views/Systems/Homepage";
import ProductPage from "./Views/Products/ProductPage";
import GroupProductsPage from "./Views/Products/Report/GroupProductsPage";
import UnitsPage from "./Views/Products/Report/UnitsPage";
import Login from "./Views/Login/Login";
import UserPage from "./Views/Systems/MainFuntion/User/Page/UserPage";
import AuthoritiesPage from "./Views/Systems/MainFuntion/Authorities/AuthoritiesPage/AuthoritiesPage";
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
          <Route index element={<Homepage />} />

          <Route path="he-thong">
            <Route index element={<Homepage />} />
            <Route path="phan-quyen" element={<AuthoritiesPage />} />
            <Route path="nguoi-dung" element={<UserPage />} />
          </Route>
          <Route path="san-pham">
            <Route index element={<ProductPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="groups-product" element={<GroupProductsPage />} />
            <Route path="unit" element={<UnitsPage />} />
          </Route>
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
