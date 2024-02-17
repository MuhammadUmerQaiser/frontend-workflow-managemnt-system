import AdminRoutes from "./AdminRoutes";
import GlobalRoutes from "./GlobalRoutes";
import UserRoutes from "./UserRoutes";

function Routes() {
  return (
    <div>
      <GlobalRoutes />
      <AdminRoutes />
      <UserRoutes />
    </div>
  );
}

export default Routes;
