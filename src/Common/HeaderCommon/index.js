import { fbManagementSiderItems } from "../../Views/FBManagement";
import { productSiderItems } from "../../Views/Products";
import { systemSiderItems } from "../../Views/Systems";

export const Modules = [
  { label: "Hệ thống", key: "/dash", screen: systemSiderItems },
  { label: "Sản phẩm", key: "/dash/san-pham", screen: productSiderItems },
  {
    label: "Quản lý FB",
    key: "/dash/facebook-management",
    screen: fbManagementSiderItems,
  },
];
