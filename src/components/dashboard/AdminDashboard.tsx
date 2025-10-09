import { ReactNode } from "react";
import DashboardContainer from "../containers/DashboardContainer";

interface Props {
  children: ReactNode;
}

const AdminDashboard = ({ children }: Props) => {
  return <DashboardContainer role="admin">{children}</DashboardContainer>;
};

export default AdminDashboard;
