import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./layouts";
import { HomePage, ChartPage, ChatPage, LoginPage } from "./pages";
import { useAuthContext } from "./contexts/AuthProvider";
import PricingPage from "./pages/Pricing";
import SecondLayout from "./layouts/Second";

function App() {
  const { user, setUser } = useAuthContext();

  return (
    <RouterProvider router={createBrowserRouter([
      {
          path: "/",
          element: <MainLayout />,
          children: [
              { path: "/", element: <Navigate to='/login' /> },
              { path: "/chat", element: user ? <ChatPage /> : <Navigate to='/login' /> },
              { path: "/chat/:chatId", element: user ? <ChatPage /> : <Navigate to='/login' /> },
              { path: "/login", element: user ? <Navigate to="/chat" /> : <LoginPage /> },
            //   { path: "/chart", element: <ChartPage /> },
          ],
      },
      {
        path: "/",
        element: <SecondLayout />,
        children: [
            { path: "/pricing", element: <PricingPage /> }
        ],
    },
      
  ])} />
  )
}

export default App
