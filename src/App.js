import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
const Layout = () => {
  return (
    <div>
      <Header />
      <div
        style={{
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
