import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import LastCallVacations from "../pages/LastCallVacations/LastCallVacations";
import MyAccount from "../pages/MyAccount/MyAccount";
import SingleResortPage from "../components/SingleResortPage/SingleResortPage";
import Search from "../pages/Search/Search";
import SearchBarMobile from "../shared/Header/SearchBarMobile/SearchBarMobile";
import ResortInputForm from "../pages/ResortInputForm/ResortInputForm";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import Dashboard from "../layout/Dashboard";
import Overview from "../pages/Overview/Overview";
import Checkout from "../pages/Checkout/Checkout";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SingUp/SingUp";
import Payment from "../pages/Payment/Payment";
import SingleAvailableUnit from "../components/SingleResortPage/FilterContent/FilteredComponent/SingleAvailableUnit";
import AvailableBooking from "../components/SingleResortPage/FilterContent/FilteredComponent/AvailableBooking";
import PaymentConfirmation from "../pages/PaymentConfirmation/PaymentConfirmation";
import AdminPanel from "../layout/AdminPanel/AdminPanel";
import AdminControl from "../pages/AdminControl/AdminControl";
import UserControl from "../pages/UserControl/UserControl";
import MyBookings from "../pages/MyBookings/MyBookings";
import AdminOverview from "../pages/AdminOverview/AdminOverview";
import UsersBookings from "../pages/UsersBookings/UsersBookings";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/lastCallVacation", element: <LastCallVacations /> },
      { path: "/myAccount", element: <MyAccount /> },
      { path: "/singleResortPage/:id", element: <SingleResortPage /> },
      { path: "search_bar_mobile", element: <SearchBarMobile /> },
      { path: "/search", element: <Search /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "checkout", element: <Checkout /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "payment", element: <Payment /> },
      { path: "payment-confirmation", element: <PaymentConfirmation /> },
      { path: "single-available-unit", element: <SingleAvailableUnit /> },
      { path: "available-booking", element: <AvailableBooking /> },
      { path: "*", element: <NotFoundPage/> },
    ],
  },

  // Dashboard Part
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      { path: "overview", element: <Overview /> },
      { path: "my-bookings", element: <MyBookings /> }
    ],
  },

  // Admin Panel Part
  {
    path: "admin-panel",
    element: <AdminPanel />,
    children: [
      { path: "admin-overview", element: <AdminOverview /> },
      { path: "admin-control", element: <AdminControl /> },
      { path: "user-control", element: <UserControl /> },
      { path: "resort-input-form", element: <ResortInputForm /> },
      { path: "users-bookings", element: <UsersBookings/>}
    ],
  },
]);
