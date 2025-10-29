import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/HomePage/Home";
import AboutUs from "../pages/AboutUsPage/AboutUs";
import ContactUs from "../pages/ContactUsPage/ContactUs";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/DashboardPages/DashboardHome";
import FieldRegistration from "../pages/DashboardPages/FarmerDashboardPages/FieldRegistration";
import MyProfile from "../pages/DashboardPages/UserProfile/MyProfile";
import ActivityLoggingScheduling from "../pages/DashboardPage/FarmerDashboardPage/ActivityLoggingScheduling";
import DailyToDoList from "../pages/DashboardPage/FarmerDashboardPage/DailyToDoList";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../components/AuthComponents/Register";
import Login from "../components/AuthComponents/Login";
import ResourceManagement from "../pages/DashboardPage/FarmerDashboardPage/ResourceManagement/ResourceManagement";
import Cart from "../pages/CartPage/Cart";
import Blog from "../pages/Blog/Blog";
import ErrorPage from "../pages/DashboardPages/ErrorPage";
import ProductCategoryManagement from "../pages/DashboardPages/AdminDashboardPages/CategoryManagement/ProductCategoryManagement";
import GovtNewsAndFacilities from "../pages/DashboardPages/AdminDashboardPages/ContentManagment/GovtNewsAndFacilities";
import ManageFarmers from "../pages/DashboardPages/AdminDashboardPages/UserManagement/ManageFarmers";
import ManageSellers from "../pages/DashboardPages/AdminDashboardPages/UserManagement/ManageSellers";
import ManageCustomers from "../pages/DashboardPages/AdminDashboardPages/UserManagement/ManageCustomers";
import ManageAgriSpecialists from "../pages/DashboardPages/AdminDashboardPages/UserManagement/ManageAgriSpecialists";
import BlogsManagement from "../pages/DashboardPages/AdminDashboardPages/BlogsManagement/BlogsManagement";
import ProductDetails from "../components/shopComponents/ProductDetails";
import StartNewCrop from "../pages/DashboardPages/FarmerDashboardPages/CropManagement/StartNewCrop";
import ManagementInstructionalGuides from "../pages/DashboardPages/AdminDashboardPages/ContentManagment/ManagementInstructionalGuides";
import SpecialistsSalary from "../pages/DashboardPages/AdminDashboardPages/FinancialsAndCommission/SpecialistsSalary";
import AddNewProduct from "../pages/DashboardPages/SellerDashboardPages/AddNewProduct";
import ProductTypeManagement from "../pages/DashboardPages/AdminDashboardPages/CategoryManagement/ProductTypeManagement";
import ProductSubCategoryManagement from "../pages/DashboardPages/AdminDashboardPages/CategoryManagement/ProductSubCategoryManagement";
import ProductVariantManagement from "../pages/DashboardPages/AdminDashboardPages/CategoryManagement/ProductVariantManagement";
import Shop from "../pages/ShopPage/Shop";
import MyReviews from "../pages/DashboardPages/CustomerDashboardPages/MyReviews";
import MyWishlist from "../pages/DashboardPages/CustomerDashboardPages/MyWishlist";
import OrderTracking from "../pages/DashboardPages/CustomerDashboardPages/OrderTracking";
import ChatWithAgriSpecialist from "../pages/DashboardPages/FarmerDashboardPages/GuidanceAndSupport/ChatWithAgriSpecialist";
import SpecialistChat from "../pages/DashboardPages/AgriSpecialistDashboardPages/Chat/SpecialistChat";
import ProductModeration from "../pages/DashboardPages/AdminDashboardPages/ProductModeration/ProductModeration";
import ActivityRoute from "../pages/DashboardPages/FarmerDashboardPages/ActivityRoute";
import WeatherForecast from "../pages/DashboardPages/FarmerDashboardPages/WeatherForecast";
import SellerDashboardHome from "../pages/DashboardPages/SellerDashboardPages/SellerDashboardHome";
import FarmerDashboardHome from "../pages/DashboardPages/FarmerDashboardPages/FarmerDashboardHome";
import CropWiseInstruction from "../pages/DashboardPages/AgriSpecialistDashboardPages/CropWiseInstruction";
import NewCultivationRequestForm from "../components/FarmarDashboardComponents/NewCultivationRequestForm";
import MyCultivationsPage from "../components/FarmarDashboardComponents/MyCultivationsPage";
import BlogsManagementByAS from "../pages/DashboardPages/AgriSpecialistDashboardPages/BlogsManagementByAS";
import FarmersProfiles from "../pages/DashboardPages/AgriSpecialistDashboardPages/FarmersProfiles";
import MyEarnings from "../pages/DashboardPages/AgriSpecialistDashboardPages/MyEarnings";
import ChatBot from "../pages/DashboardPages/FarmerDashboardPages/ChatBot";
import CartPage from '../pages/DashboardPages/CustomerDashboardPages/CartPage';
import GovernmentInfo from "../pages/DashboardPages/FarmerDashboardPages/GovernmentInfo";
import InstructionalGuides from "../pages/DashboardPages/FarmerDashboardPages/GuidanceAndSupport/InstructionalGuides";
import BecomeAPartner from "../pages/BecomeAPartner/BecomeAPartner";


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
      {
        path: "shop",
        Component: Shop,
      },
      {
        path: "shop/:id",
        Component: ProductDetails,
      },
      // Conflict resolved: Using CartPage component for 'cart' path.
      {
        path: 'cart',
        Component: CartPage, 
      },
      {
        path: "blog",
        Component: Blog,
      },
      // Note: This route exists under both RootLayout and DashboardLayout.
      // {
      //   path: "update-profile/:email",
      //   Component: MyProfile,
      // },
      {
        path: "becomeapartner",
        Component: BecomeAPartner,
      },
      // {
      //   path: "underconstructionpage",
      //   Component: UnderConstructionPage,
      // }
    ],
  },

  // -------------------------------------------
  // Dashboard Layout
  // -------------------------------------------
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: DashboardHome,
      },

     {
        path: "update-profile/:email",
        Component: MyProfile,
      },

      // === Admin Dashboard Routes ===
      {
        path: "management-instructional-guides",
        Component: ManagementInstructionalGuides,
      },
      {
        path: "specialist's-salary",
        Component: SpecialistsSalary,
      },

      // Duplicate removed: Kept the first 'management-product-category'
      {
        path: "management-product-category",
        Component: ProductCategoryManagement,
      },

      {
        path: "manage-sellers",
        Component: ManageSellers,
      },
      {
        path: "manage-customers",
        Component: ManageCustomers,
      },
      {
        path: "manage-agri-specialists",
        Component: ManageAgriSpecialists,
      },
      {
        path: "manage-farmers",
        Component: ManageFarmers,
      },
      {
        path: "manage-product-type",
        Component: ProductTypeManagement,
      },
      {
        path: "manage-product-subCategory",
        Component: ProductSubCategoryManagement,
      },
      {
        path: "manage-product-variant",
        Component: ProductVariantManagement,
      },
      {
        path: "govt-news-facilites",
        Component: GovtNewsAndFacilities,
      },
      {
        path: "blogs-management",
        Component: BlogsManagement,
      },
      {
        path: "product-moderation",
        Component: ProductModeration,
      },
      
      // === Farmer Dashboard Routes ===
      {
        path: "farmer-dashboard-home",
        Component: FarmerDashboardHome,
      },
      {
        path: "field-registration",
        Component: FieldRegistration,
      },
      {
        path: "my-cultivations",
        Component: MyCultivationsPage,
      },
      {
        path: "new-cultivation-request",
        Component: NewCultivationRequestForm,
      },
      {
        path: "ActivityRoute",
        loader: () => fetch("http://localhost:3000/activities"),
        Component: ActivityRoute,
      },
      {
        path: "new-crop",
        Component: StartNewCrop,
      },
      {
        path: "activity-scheduling",
        Component: ActivityLoggingScheduling,
      },
      {
        path: "instructional-guides",
        Component: InstructionalGuides, 
      },
      {
        path: "live-chat",
        Component: ChatWithAgriSpecialist,
      },
      {
        path:"government-info",
        Component: GovernmentInfo,
      },
      {
        path: "chat-bot",
        Component: ChatBot,
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

      // === Seller Dashboard Routes ===
      {
        path: "seller-dashboard-home",
        Component: SellerDashboardHome,
      },
      {
        path: "add-new-item",
        Component: AddNewProduct,
      },

      // === Customer Dashboard Routes ===
      {
        path: "review-rating",
        Component: MyReviews,
      },
      {
        path: "wishlist",
        Component: MyWishlist,
      },
      {
        path: "track-current-orders",
        Component: OrderTracking,
      },
      
      // === Agri Specialist Dashboard Routes ===
      {
        path: "crop-wise-instruction",
        Component: CropWiseInstruction,
      },
      {
        path: "blogs-management-ByAS",
        Component: BlogsManagementByAS,
      },
      {
        path: "farmers-profiles",
        Component: FarmersProfiles,
      },
      {
        path: "chat-with-farmers",
        Component: SpecialistChat,
      },
      {
        path: "my-earnings",
        Component: MyEarnings,
      },

      // Catch-all route for errors
      {
        path: "*",
        Component: ErrorPage,
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
