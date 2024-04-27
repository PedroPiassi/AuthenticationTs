import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);
