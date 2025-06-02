import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  Link,
  redirect,
  useRouterState,
} from "@tanstack/react-router";
import Login from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import OffersPage from "../pages/OffersPageAll";
import ProfilePage from "../pages/ProfilePage";
import { useEffect, useState } from "react";
import OffersPageMine from "../pages/OffersPageMine";
import PrincipalPage from "../pages/PrincipalPage";

const requireAuth = () => {
  const token = localStorage.getItem("token");
  if (!token || token === "undefined" || token === "null") {
    throw redirect({ to: "/login" });
  }
}

const rootRoute = createRootRoute({
  component: () => {
    const [showNavbar, setShowNavbar] = useState(false);
    const { pathname } = useRouterState({ select: (s) => s.location });

    useEffect(() => {
      const token = localStorage.getItem("token");
      const isAuthPage = ["/", "/home","/login", "/register"].includes(pathname);
      setShowNavbar(!!token && !isAuthPage);
    }, [pathname]);

        if (showNavbar) {
    return (
      <>
        <nav className="navbar">
          <div className="navbar-left">
            <Link to="/home" className="navbar-logo">
              <img src="https://i.postimg.cc/t456FBnX/Whats-App-Image-2025-06-02-at-17-05-25-22796109.jpg" alt="Logo" className="navbar-logo"/> 
            </Link>
          </div>
          <div className="navbar-right">
            <Link to="/offers">Offers</Link>
            <Link to="/profile">Profile</Link>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("candidate");
                window.location.href = "/login";
              }}
            >
              Log out
            </button> 
          </div>
          
        </nav>
        <Outlet />
      </>
    );
  }
    return (
      <>
        <Outlet />
      </>
    )
  }
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: PrincipalPage,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
})

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
})

const offersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/offers",
  beforeLoad: requireAuth,
  component: OffersPage,
})

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  beforeLoad: requireAuth,
  component: ProfilePage,
})

const offersMineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/offers/mine",
  beforeLoad: requireAuth,
  component: OffersPageMine,
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/home",
  component: PrincipalPage,
})

export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  offersRoute,
  profileRoute,
  offersMineRoute,
  homeRoute
])

export const router = createRouter({
  routeTree
})