// import { Children } from "react";
import ProtectedRoute from "./ProtectedRoutes";

import NotFound from "../Utils/NotFound/NotFound";
import SSOLogin from "../pages/public/login/SSOLogin";
import CustomLayout from "../Layout/CustomLayout/CustomLayout";


export const LayoutRoutes = [

    {path: "", element: <SSOLogin />},

    // {path: "home", element: <ProtectedRoute element={<p>admin</p>} /> ,
    //     children : [
    //         {path: "", element: <ProtectedRoute element={<p>asfd</p>} />},
    //         {path: "user-list", element: <ProtectedRoute element={<p>asfd</p>}  />},
    //     ]
    // },

    {path: "home", element: <ProtectedRoute element={<CustomLayout menuitem={'ADMIN'} />} allowedRole={['ADMIN', 'USER']} /> ,
        children : [
            // {path: "", element: <ProtectedRoute element={<p>asfd</p>} allowedRole={['ADMIN']}/>},
            {path: "profile", element: <ProtectedRoute element={<p>asadasdasdsadsadsadsadasdsfd</p>} allowedRole={['ADMIN','USER']} />},
            {path: "user-list", element: <ProtectedRoute element={<p>asfd</p>} allowedRole={['ADMIN']} />}
        ]
    },

    // {path: "home", element: <ProtectedRoute element={<p>admin</p>} allowedRole={['ADMIN']} /> ,
    //     children : [
    //         {path: "", element: <ProtectedRoute element={<p>asfd</p>} allowedRole={['ADMIN']}/>},
    //         {path: "buyer-list", element: <ProtectedRoute element={<p>asfd</p>} allowedRole={['ADMIN']} />},
    //         {path: "seller-list", element: <ProtectedRoute element={<p>asfd</p>} allowedRole={['ADMIN']} />}
    //     ]
    // },

    // {path: "home", element: <ProtectedRoute element={<p>home</p>} allowedRole={['BUYER', 'SELLER']} /> ,
    //     children : [
    //         {path: "buyer", element: <ProtectedRoute element={<p>asfd</p>} allowedRole={['BUYER']}/>},
    //         {path: "seller", element: <ProtectedRoute element={<p>asfd</p>} allowedRole={['SELLER']} />},
    //     ]
    // },

    {path: "*", element: <NotFound />}

]
