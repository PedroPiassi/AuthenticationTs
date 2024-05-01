import { observer } from "mobx-react-lite";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import useAuthService from "@/services/auth";
import { useEffect, useState } from "react";

export const PrivateRoutes = observer(() => {
  const authService = useAuthService();
  const token = Cookies.get("token") || "";
  const [loged, setLoged] = useState(false);

  const handleAuth = async () => {
    try {
      const resp = await authService.isLoged(token);
      setLoged(resp.data.status);
      console.log("cima", resp.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleAuth();
  }, []);

  console.log("baixo", loged);
  return loged ? <Outlet /> : <Navigate to="/login" />;
});
