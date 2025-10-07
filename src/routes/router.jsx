import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/HomePage/Home';
import AboutUs from '../pages/AboutUsPage/AboutUs';
import ContactUs from '../pages/ContactUsPage/ContactUs';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardHome from '../pages/DashboardPages/DashboardHome';
import FieldRegistration from '../pages/DashboardPages/FarmerDashboardPages/FieldRegistration';
import MyProfile from '../pages/DashboardPage/ProfilePage/MyProfile';
import ActivityLoggingScheduling from '../pages/DashboardPage/FarmerDashboardPage/ActivityLoggingScheduling';
import ChatwithAgriSpecialist from '../pages/DashboardPage/FarmerDashboardPage/ChatwithAgriSpecialist';
import WeatherForecast from '../pages/DashboardPage/FarmerDashboardPage/WeatherForecast';
import DailyToDoList from '../pages/DashboardPage/FarmerDashboardPage/DailyToDoList';
import AuthLayout from '../layouts/AuthLayout';
import Register from '../components/AuthComponents/Register';
import Login from '../components/AuthComponents/Login';
import ResourceManagement from '../pages/DashboardPage/FarmerDashboardPage/ResourceManagement/ResourceManagement';
import Shop from '../pages/ShopPage/Shop';
import Cart from '../pages/CartPage/Cart';
import Blog from '../pages/Blog/Blog';
import ErrorPage from '../pages/DashboardPages/ErrorPage';
import CategoryManagement from '../pages/DashboardPages/AdminDashboardPages/CategoryManagement/CategoryManagement';
import GovtNewsAndFacilities from '../pages/DashboardPages/AdminDashboardPages/ContentManagment/GovtNewsAndFacilities';
import BlogsManagement from '../pages/DashboardPages/AdminDashboardPages/BlogsManagement/BlogsManagement';
import StartNewCrop from '../pages/DashboardPages/FarmerDashboardPages/CropManagement/StartNewCrop';
import ManagementInstructionalGuides from '../pages/DashboardPages/AdminDashboardPages/ContentManagment/ManagementInstructionalGuides';
import SpecialistsSalary from '../pages/DashboardPages/AdminDashboardPages/FinancialsAndCommission/SpecialistsSalary';

const router = createBrowserRouter([
  // -------------------------------------------
  // Root Layout
  // -------------------------------------------
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        path: '/',
        index: true,
        Component: Home,
      },
      {
        path: 'about',
        Component: AboutUs,
      },
      {
        path: 'contact',
        Component: ContactUs,
      },
      {
        path: 'shop',
        Component: Shop,
      },
      {
        path: 'cart',
        Component: Cart,
      },
      {
        path: 'blog',
        Component: Blog,
      },
      {
        path: 'update-profile/:email',
        Component: MyProfile,
      },
    ],
  },

  // -------------------------------------------
  // Dashboard Layout
  // -------------------------------------------

  {
    path: '/dashboard',
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: 'my-profile',
        Component: MyProfile,
      },
      
      // Admin Dashboard Routes
      {
        path: 'management-instructional-guides',
        Component: ManagementInstructionalGuides,
      },
      {
        path: "specialist's-salary",
        Component: SpecialistsSalary,
      },

      // Farmer Dashboard Routes

      {
        path: 'field-registration',
        Component: FieldRegistration,
      },

      {
        path: 'new-crop',
        Component: StartNewCrop,
      },
      {
        path: 'activity-scheduling',
        Component: ActivityLoggingScheduling,
      },
      {
        path: 'chat-specialist',
        Component: ChatwithAgriSpecialist,
      },
      {
        path: 'resource-management',
        Component: ResourceManagement,
      },
      {
        path: 'weather-forecast',
        Component: WeatherForecast,
      },
      {
        path: 'daily-todo-list',
        Component: DailyToDoList,
      },
      // Admin Dashboard Routes
      {
        path: 'category-management',
        Component: CategoryManagement,
      },
      {
        path: 'govt-news-facilites',
        Component: GovtNewsAndFacilities,
      },
      {
        path: 'blogs-management',
        Component: BlogsManagement,
      },
      {
        path: '*',
        Component: ErrorPage,
      },
    ],
  },

  // -------------------------------------------
  // Auth Layout
  // -------------------------------------------
  {
    path: '/auth',
    Component: AuthLayout,
    children: [
      {
        index: true,
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
    ],
  },
  // -------------------------------------------
]);

export default router;
