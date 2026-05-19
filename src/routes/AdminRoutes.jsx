import { Navigate } from 'react-router-dom';

/**
 * AdminRoutes — protects all /admin/* routes
 *
 * Abhi isAdmin = true hardcoded hai.
 * Baad mein apna auth logic yahan lagao:
 *
 * Redux example:
 *   const { user } = useSelector(state => state.auth);
 *   const isAdmin = user?.role === 'admin';
 *
 * Context example:
 *   const { user } = useAuth();
 *   const isAdmin = user?.role === 'admin';
 */
export default function AdminRoutes({ children }) {
  const isAdmin = true; // 🔒 apna auth check yahan lagao

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}