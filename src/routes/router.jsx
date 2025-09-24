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
import AuthLayout from "../layouts/AuthLayout";
import LogInPage from "../pages/AuthenticationPage/LogInPage";
import RegisterPage from "../pages/AuthenticationPage/RegisterPage";
import WeatherForecast from "../pages/DashboardPage/FarmerDashboardPage/WeatherForecast";
import DailyToDoList from "../pages/DashboardPage/FarmerDashboardPage/DailyToDoList";

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
      {
        path: "daily-todo-list",
        Component: DailyToDoList,
      },
    ],
  },

  // -------------------------------------------
  // Auth Layout
  // -------------------------------------------
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: LogInPage,
      },
      {
        path: "register",
        Component: RegisterPage,
      },
    ],
  },
  // -------------------------------------------
]);

export default router;
