import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './reducs/store.js'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from './component/page/error/NotFoundPage.jsx'
import Layout from './component/layout/Layout.jsx'
import EventHome from './component/page/eventAll/EventHome.jsx'
import EventDetails from './component/page/eventAll/EventDetails.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      
      {
        path:"/eventHome",
        element:<EventHome/>
      },
      {
        path:"/eventDetail/:id",
        element:<EventDetails/>
      }
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
    <Provider store={store} >
    <RouterProvider router={router}/>
      
    </Provider>
  </React.StrictMode>
);
