import "../../assets/vendor/boxicons/css/boxicons.min.css";
import "../../assets/vendor/quill/quill.snow.css";
import "../../assets/vendor/quill/quill.bubble.css";
import "../../assets/vendor/remixicon/remixicon.css";
import "../../assets/vendor/simple-datatables/style.css";
import "../../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../../assets/js/main.js";
import "../../styles/admin/styles.css";
import DashboardHeader from "./DashboardHeader.jsx";
import DashboardSidebar from "./DashboardSidebar.jsx";
import DashboardFooter from "./DashboardFooter.jsx";

const UserLayout = ({children}) => {
  return (
    <>
        <DashboardHeader></DashboardHeader>
        <DashboardSidebar></DashboardSidebar>
        {children}
        <DashboardFooter></DashboardFooter>
    </>
  );
};

export default UserLayout;
