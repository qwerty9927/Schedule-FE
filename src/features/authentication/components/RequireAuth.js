import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

function RequireAuth({ children }){
  const { authed } = useAuth()
  const location = useLocation()
  return authed ? children : <Navigate to={location.pathname + "/login"} state={location.pathname} />
}

export default RequireAuth