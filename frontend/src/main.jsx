import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Transaction from './Transaction';
import AddTransaction from './AddTransaction';
import DeleteTransaction from './DeleteTransaction';
import EditTransaction from './EditTransaction';
import ErrorPage from './ErrorPage';
import "./output.css";


const routes = createBrowserRouter(
  [
    {path: "/", element: <Transaction/>},
    {path: "/add", element: <AddTransaction/>},
    {path: "/:id/edit", element: <EditTransaction/>},
    {path: "/:id/delete", element: <DeleteTransaction/>},
    {path: "/*", element: <ErrorPage/>}
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}/>
  </StrictMode>,
)
