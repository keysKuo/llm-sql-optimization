import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./layouts";
import { HomePage, ChartPage } from "./pages";

function App() {
  return (
    <RouterProvider router={createBrowserRouter([
      {
          path: "/",
          element: <MainLayout />,
          children: [
              { path: "/", element: <HomePage /> },
              { path: "/chart", element: <ChartPage /> },
          ],
      }
  ])} />
  )
}

export default App
