import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./layouts";
import { HomePage, ChartPage, ChatPage, LoginPage } from "./pages";
import { useAuthContext } from "./contexts/AuthProvider";

function App() {
  const { user, setUser } = useAuthContext();
  return (
    <RouterProvider router={createBrowserRouter([
      {
          path: "/",
          element: <MainLayout />,
          children: [
              // { path: "/", element: user ? <ChatPage /> : <Navigate to='/login' /> },
              { path: "/chat", element: user ? <ChatPage /> : <Navigate to='/login' /> },
              { path: "/chat/:chatId", element: user ? <ChatPage /> : <Navigate to='/login' /> },
              { path: "/login", element: user ? <Navigate to="/" /> : <LoginPage /> },
            //   { path: "/chart", element: <ChartPage /> },
          ],
      }
  ])} />
  )
}

export default App
