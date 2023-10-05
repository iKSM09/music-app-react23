import { authDialogAtom } from "@/context/atoms";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useSetAtom } from "jotai";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = useCurrentUser();
  const setAuthDialogOpen = useSetAtom(authDialogAtom);

  setAuthDialogOpen(true);

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
