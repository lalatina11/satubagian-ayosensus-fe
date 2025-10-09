import { ReactNode } from "react";
import DashboardContainer from "../containers/DashboardContainer";

interface Props {
  children: ReactNode;
}
const UserDashboard = ({ children }: Props) => {
  return <DashboardContainer role="user">{children}</DashboardContainer>;
};

export default UserDashboard;
