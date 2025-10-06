import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const UserDashboard = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default UserDashboard;
