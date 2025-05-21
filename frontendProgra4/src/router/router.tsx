import {createRootRoute, createRoute, createRouter, Link, Outlet,} from '@tanstack/react-router'
import OffersPage from '../pages/OffersPage'
import ProfilePage from '../pages/ProfilePage'

// Layout con navegación
const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2 menu">
        <Link to="/offers" className="[&.active]:font-bold">Offers</Link>
        <Link to="/profile" className="[&.active]:font-bold">Profile</Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
})

/*
const loginRoute = createRoute({
  path: '/login',
  getParentRoute: () => rootRoute,
  component: ()=> <LoginPage/>,
})

const registerRoute = createRoute({
  path: '/register',
  getParentRoute: () => rootRoute,
  component: () => <RegisterPage/>, // Placeholder para el registro
})
*/

const offerRoute = createRoute({
  path: '/offers',
  getParentRoute: () => rootRoute,
  component: ()=> <OffersPage/>,
})

const profileRoute = createRoute({
  path: '/profile',
  getParentRoute: () => rootRoute,
  component: ()=> <ProfilePage/>,
})

// Construcción del árbol de rutas
const routeTree = rootRoute.addChildren([
  //loginRoute,
  //registerRoute,
  offerRoute,
  profileRoute,
])

// Exportación del router
export const router = createRouter({ routeTree })
