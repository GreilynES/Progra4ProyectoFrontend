import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  Link,
} from '@tanstack/react-router';
import Login from '../pages/LoginPage';
import RegisterPage from '../pages/candidates/RegisterPage';
import OffersPage from '../pages/OffersPage';
import ProfilePage from '../pages/ProfilePage';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2 menu">
        <Link to="/login" className="[&.active]:font-bold">Login</Link>
        <Link to="/register" className="[&.active]:font-bold">Register</Link>
        <Link to="/offers" className="[&.active]:font-bold">Offers</Link>
        <Link to="/profile" className="[&.active]:font-bold">Profile</Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: () => <Login />,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: () => <RegisterPage />,
});

const offerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/offers',
  component: () => <OffersPage />,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: () => <ProfilePage />,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  registerRoute,
  offerRoute,
  profileRoute,
]);

export const router = createRouter({
  routeTree,
});
