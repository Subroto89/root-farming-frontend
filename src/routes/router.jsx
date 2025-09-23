import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/HomePage/Home";
import AboutUs from "../pages/AboutUsPage/AboutUs";
import ContactUs from "../pages/ContactUsPage/ContactUs";

const router = createBrowserRouter([
   // -------------------------------------------
   // Root Layout
   // -------------------------------------------
   {
      path: "/",
      Component: RootLayout,
      children: [
         {
            path: "/",
            index: true,
            Component: Home,
         },
         {
            path: "/about",
            Component: AboutUs,
         },
         {
            path: "/contact",
            Component: ContactUs,
         },
      ],
   },

   // -------------------------------------------
   // Dashboard Layout
   // -------------------------------------------
   {},

   // -------------------------------------------
   // Auth Layout
   // -------------------------------------------
   {},
]);

export default router;
