import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/HomePage/Home";
import AboutUs from "../pages/AboutUsPage/AboutUs";
import ContactUs from "../pages/ContactUsPage/ContactUs";
import DashboardLayout from "../layouts/DashboardLayout";
import Statisticspage from "../pages/Statisticspage/Statisticspage";
import MyProfile from "../pages/DashboardPage/ProfilePage/MyProfile";
import FieldRegistration from "../pages/DashboardPage/FarmerDashboardPage/FieldRegistration";
import ActivityLoggingScheduling from "../pages/DashboardPage/FarmerDashboardPage/ActivityLoggingScheduling";
import ChatwithAgriSpecialist from "../pages/DashboardPage/FarmerDashboardPage/ChatwithAgriSpecialist";
import ResourceManagement from "../pages/DashboardPage/FarmerDashboardPage/ResourceManagement";
import WeatherForecast from "../pages/DashboardPage/FarmerDashboardPage/WeatherForecast";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../components/AuthComponents/Register";
import Login from "../components/AuthComponents/Login";

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
        path: "about",
        Component: AboutUs,
      },
      {
        path: "contact",
        Component: ContactUs,
      },
    ],
  },

  // -------------------------------------------
  // Dashboard Layout

  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: Statisticspage,
      },
      {
        path: "my-profile",
        Component: MyProfile,
      },

      // Farmardashboardpage

      {
        path: "field-registration",
        Component: FieldRegistration,
      },
      {
        path: "activity-scheduling",
        Component: ActivityLoggingScheduling,
      },
      {
        path: "chat-specialist",
        Component: ChatwithAgriSpecialist,
      },
      {
        path: "resource-management",
        Component: ResourceManagement,
      },
      {
        path: "weather-forecast",
        Component: WeatherForecast,
      },
    ],
  },

  // -------------------------------------------
  // Auth Layout
  // -------------------------------------------
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        index: true,
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  // -------------------------------------------
]);

export default router;
