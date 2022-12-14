import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Login, { loginAction } from "./buildingBlocks/login";
import Register, { RegisterAction } from "./buildingBlocks/register";
import HomePage from "./pages/homePage";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
      children: [
        {
          path: "/",
          element: <Login />,
          action: loginAction,
        },
        {
          path: "/register",
          element: <Register />,
          action: RegisterAction,
        },
      ],
    },
    {
      path: "/home/",
      element: <HomePage />,
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
