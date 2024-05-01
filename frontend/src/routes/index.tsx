import { Login } from "@/pages/Login";
import Home from "@/pages/home";
import { createBrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "./auth";

export const routes = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: [{ element: <Home />, path: "/" }],
  },
  { element: <Login />, path: "/login" },
]);
