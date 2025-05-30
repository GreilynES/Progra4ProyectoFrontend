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
      const isAuthPage = ["/login", "/register"].includes(pathname);
      setShowNavbar(!!token && !isAuthPage);
    }, [pathname]); // Se actualiza cuando cambia la ruta

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
            Cerrar Sesión
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
  beforeLoad: () => {
    throw redirect({ to: "/register" });
  },
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


// Crear el router
export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  offersRoute,
  profileRoute,
  offersMineRoute
]);

export const router = createRouter({
  routeTree
});