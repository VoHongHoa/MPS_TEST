import { Route, Routes } from "react-router-dom";
import "./App.css";
import DashLayout from "./Common/DashLayout";
import Layout from "./Common/Layout";
import CategoriesPage from "./Views/Products/Report/CategoriesPage";
import Homepage from "./Views/Systems/Homepage";
import ProductPage from "./Views/Products/ProductPage";
import GroupProductsPage from "./Views/Products/Report/GroupProductsPage";
import UnitsPage from "./Views/Products/Report/UnitsPage";
import Login from "./Views/Login/Login";
import AuthoritiesPage from "./Views/Systems/MainFuntion/Authorities/AuthoritiesPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        {/* Start dash route */}
        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Homepage />} />
          <Route path="he-thong">
            <Route index element={<Homepage />} />
            <Route path="phan-quyen" element={<AuthoritiesPage />} />
            <Route path="groups-product" element={<GroupProductsPage />} />
            <Route path="unit" element={<UnitsPage />} />
          </Route>
          <Route path="san-pham">
            <Route index element={<ProductPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="groups-product" element={<GroupProductsPage />} />
            <Route path="unit" element={<UnitsPage />} />
          </Route>
        </Route>
        {/* End dash route */}
      </Route>
    </Routes>
  );
}

export default App;
