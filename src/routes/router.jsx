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

 export  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/lastCallVacation",
          element: <LastCallVacations />,
        },
        {
          path: "/myAccount",
          element: <MyAccount />,
        },
        {
          path: "/singleResortPage/:id",
          element: <SingleResortPage />,
        },
        {
          path: "search_bar_mobile",
          element: <SearchBarMobile />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        
        {
          path: 'profile',
          element: <ProfilePage/>
        },
        {
          path: 'checkout',
          element: <Checkout/>
        },
        {
          path: 'login',
          element: <Login/>
        },
        {
          path: 'signup',
          element: <SignUp/>
        }
      ],
    },

    // Dashboard Part
    {
      path: 'dashboard',
      element: <Dashboard></Dashboard>,
      children: [
          {
              path: 'overview',
              element: <Overview/>
          },
          {
              path: 'resort-input-form',
              element: <ResortInputForm/>
          },
         
      ]
  },
  ]);