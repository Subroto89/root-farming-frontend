import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/HomePage/Home';
import AboutUs from '../pages/AboutUsPage/AboutUs';
import ContactUs from '../pages/ContactUsPage/ContactUs';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardHome from '../pages/DashboardPages/DashboardHome';
import FieldRegistration from '../pages/DashboardPages/FarmerDashboardPages/FieldRegistration';
import MyProfile from '../pages/DashboardPages/UserProfile/MyProfile';
import ActivityLoggingScheduling from '../pages/DashboardPage/FarmerDashboardPage/ActivityLoggingScheduling';
import ChatwithAgriSpecialist from '../pages/DashboardPage/FarmerDashboardPage/ChatwithAgriSpecialist';
import DailyToDoList from '../pages/DashboardPage/FarmerDashboardPage/DailyToDoList';
import AuthLayout from '../layouts/AuthLayout';
import Register from '../components/AuthComponents/Register';
import Login from '../components/AuthComponents/Login';
import ResourceManagement from '../pages/DashboardPage/FarmerDashboardPage/ResourceManagement/ResourceManagement';

// import Shop from '../pages/ShopPage/Shop';
import Cart from '../pages/CartPage/Cart';
import Blog from '../pages/Blog/Blog';
import ErrorPage from '../pages/DashboardPages/ErrorPage';
import ProductCategoryManagement from '../pages/DashboardPages/AdminDashboardPages/CategoryManagement/ProductCategoryManagement';
import GovtNewsAndFacilities from '../pages/DashboardPages/AdminDashboardPages/ContentManagment/GovtNewsAndFacilities';
import ManageFarmers from '../pages/DashboardPages/AdminDashboardPages/UserManagement/ManageFarmers';
import ManageSellers from '../pages/DashboardPages/AdminDashboardPages/UserManagement/ManageSellers';
import ManageCustomers from '../pages/DashboardPages/AdminDashboardPages/UserManagement/ManageCustomers';
import ManageAgriSpecialists from '../pages/DashboardPages/AdminDashboardPages/UserManagement/ManageAgriSpecialists';
import BlogsManagement from '../pages/DashboardPages/AdminDashboardPages/BlogsManagement/BlogsManagement';
import ProductDetails from '../components/shopComponents/ProductDetails';
import StartNewCrop from '../pages/DashboardPages/FarmerDashboardPages/CropManagement/StartNewCrop';
import ManagementInstructionalGuides from '../pages/DashboardPages/AdminDashboardPages/ContentManagment/ManagementInstructionalGuides';
import SpecialistsSalary from '../pages/DashboardPages/AdminDashboardPages/FinancialsAndCommission/SpecialistsSalary';
import AddNewProduct from '../pages/DashboardPages/SellerDashboardPages/AddNewProduct';
import ProductTypeManagement from '../pages/DashboardPages/AdminDashboardPages/CategoryManagement/ProductTypeManagement';
import ProductSubCategoryManagement from '../pages/DashboardPages/AdminDashboardPages/CategoryManagement/ProductSubCategoryManagement';
import ProductVariantManagement from '../pages/DashboardPages/AdminDashboardPages/CategoryManagement/ProductVariantManagement';
// import AddNewProduct from '../pages/DashboardPages/SellerDashboardPages/AddNewItem';

import Shop from '../pages/ShopPage/Shop';
import MyReviews from '../pages/DashboardPages/CustomerDashboardPages/MyReviews';
import MyWishlist from '../pages/DashboardPages/CustomerDashboardPages/MyWishlist';

import OrderTracking from '../pages/DashboardPages/CustomerDashboardPages/OrderTracking';
import ChatWithAgriSpecialist from '../pages/DashboardPages/FarmerDashboardPages/GuidanceAndSupport/ChatWithAgriSpecialist';
import SpecialistChat from '../pages/DashboardPages/AgriSpecialistDashboardPages/Chat/SpecialistChat';
import WeatherForecast from '../pages/DashboardPages/FarmerDashboardPages/WeatherForecast';

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
        path: 'shop/:id',
        Component: ProductDetails,
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

      {
        path: 'management-product-category',
        Component: ProductCategoryManagement,
      },

      {
        path: 'manage-sellers',
        Component: ManageSellers,
      },
      {
        path: 'manage-customers',
        Component: ManageCustomers,
      },
      {
        path: 'manage-agri-specialists',
        Component: ManageAgriSpecialists,
      },
      {
        path: 'manage-farmers',
        Component: ManageFarmers,
      },
      {
        path: 'manage-product-type',
        Component: ProductTypeManagement,
      },
      {
        path: 'management-product-category',
        Component: ProductCategoryManagement,
      },
      {
        path: 'manage-product-subCategory',
        Component: ProductSubCategoryManagement,
      },
      {
        path: 'manage-product-variant',
        Component: ProductVariantManagement,
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
        path: 'manage-sellers',
        Component: ManageSellers,
      },
      {
        path: 'manage-customers',
        Component: ManageCustomers,
      },
      {
        path: 'manage-agri-specialists',
        Component: ManageAgriSpecialists,
      },
      {
        path: 'manage-farmers',
        Component: ManageFarmers,
      },
      {
        path: 'manage-product-type',
        Component: ProductTypeManagement,
      },
      {
        path: 'management-product-category',
        Component: ProductCategoryManagement,
      },
      {
        path: 'manage-product-subCategory',
        Component: ProductSubCategoryManagement,
      },
      {
        path: 'manage-product-variant',
        Component: ProductVariantManagement,
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
      {
        path: 'live-chat',
        Component: ChatWithAgriSpecialist,
      },
      {
        path: 'chat-specialist',
        Component: SpecialistChat,
      },

      // Seller Dashboard Routes
      {
        path: 'add-new-item',
        Component: AddNewProduct,
      },
      {
        path: 'add-new-item',
        Component: AddNewProduct,
      },

      // Customer Dashboard Routes

      {
        path: 'review-rating',
        Component: MyReviews,
      },
      {
        path: 'wishlist',
        Component: MyWishlist,
      },
      {
        path: 'track-current-orders',
        Component: OrderTracking,
      },
      {
        path: 'update-profile/:email',
        Component: MyProfile,
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
