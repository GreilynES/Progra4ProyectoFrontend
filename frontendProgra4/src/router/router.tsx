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
import RegisterPage from "../pages/candidates/RegisterPage";
import OffersPage from "../pages/OffersPageAll";
import ProfilePage from "../pages/ProfilePage";
import { useEffect, useState } from "react";
import OffersPageMine from "../pages/OffersPageMine";
import PrincipalPage from "../pages/PrincipalPage";

// Función para proteger rutas privadas
const requireAuth = () => {
  const token = localStorage.getItem("token");
  if (!token || token === "undefined" || token === "null") {
    throw redirect({ to: "/login" });
  }
};

// Root con navbar condicional
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
        </nav>
        <Outlet />
      </>
    );
  }
    return (
      <>
        <Outlet />
      </>
    );
  },
});

// Rutas
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: PrincipalPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

const offersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/offers",
  beforeLoad: requireAuth,
  component: OffersPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  beforeLoad: requireAuth,
  component: ProfilePage,
});

const offersMineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/offers/mine",
  beforeLoad: requireAuth, // si usás protección
  component: OffersPageMine,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/home",
  component: PrincipalPage,
});

// Crear el router
export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  offersRoute,
  profileRoute,
  offersMineRoute,
  homeRoute
]);

export const router = createRouter({
  routeTree
});