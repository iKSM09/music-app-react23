import { Outlet } from "react-router-dom";

import Auth from "./Auth";

import useCurrentUser from "@/hooks/useCurrentUser";

const ProtectedRoute = () => {
  const user = useCurrentUser();

  return user ? <Outlet /> : <Auth />;
};

export default ProtectedRoute;
