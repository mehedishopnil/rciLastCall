import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../context/AuthProvider";
import logo from "../../../public/RCI_50th_logo.png";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/"; // Redirect to the previous page or default to homepage

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await login(email, password);
      const user = result.user;
      console.log(user);
      Swal.fire({
        title: "Successfully Logged In",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
      setIsLoggedIn(true);
      navigate(from, { replace: true }); // Redirect to the previous page
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Wrong Email or Password",
        footer: "Please enter correct Email or Password",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const user = result.user;
      console.log(user);
      Swal.fire({
        title: "Successfully Logged In with Google",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
      setIsLoggedIn(true);
      navigate(from, { replace: true }); // Redirect to the previous page
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error logging in with Google",
        footer: "Please try again later",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-full bg-[#fbf3ec]">
      <div className="hero w-full h-auto p-10 rounded ">
        <div className="">
          {/* Login Input section */}
          <div className="">
            <div className="flex flex-col items-center space-y-10">
              <Link to="/">
              <img src={logo} alt="logo-img" className="w-16 " />
              </Link>
              <h1 className="text-center text-3xl font-semibold pt-4">
                Sign in to your account.
              </h1>
            </div>
            <form onSubmit={handleLogin} className="mt-5">
              <div className="w-full space-y-3 ">
                <div className="form-control">
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    className="input input-bordered rounded-md border-gray-700 shadow-md"
                    required
                  />
                </div>
                <div className="form-control">
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="input input-bordered rounded-md border-gray-700 shadow-md"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="rememberMe" className="text-sm text-gray-700">
                    Remember me on this device
                  </label>
                </div>

                <div className="form-control mt-6">
                  <input
                    type="submit"
                    value="Login"
                    disabled={isLoggedIn}
                    className="btn bg-[#037092] rounded-md text-white hover:bg-[#b18441] shadow"
                  />
                </div>

                <div className="flex flex-col items-center gap-3">
                  <a
                    href="#"
                    className="text-[#037092] text-semibold underline text-center"
                  >
                    Forgot Username or Password?
                  </a>

                  <p className="font-semibold text-center">
                    New to RCI?{" "}
                    <Link
                      to={"/signup"}
                      className="font-semibold text-[#037092] underline"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </div>
            </form>
            <div className="divider">OR</div>{" "}
            {/* Divider between login methods */}
            {/* Google Login */}
            <div className="flex items-center form-control mb-4">
              <button
                onClick={handleGoogleLogin}
                className="btn text-lg  text-[#037092]  hover:bg-[#357ae8] flex items-center justify-center"
              >
                <FcGoogle className="mr-2 text-2xl" /> {/* Google icon */}
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
