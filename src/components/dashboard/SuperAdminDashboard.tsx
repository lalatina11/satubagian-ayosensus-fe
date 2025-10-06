import { ReactNode } from "react";
import DashboardContainer from "../containers/DashboardContainer";

interface Props {
  children: ReactNode;
}

const SuperAdminDashboard = ({ children }: Props) => {
  return <DashboardContainer role="superadmin">{children}</DashboardContainer>;
};

export default SuperAdminDashboard;
