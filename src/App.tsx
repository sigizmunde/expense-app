import { Route, Routes, Navigate } from 'react-router-dom';
import { PrivateRoute } from './components/Routes/PrivateRoute';
import { PublicRoute } from './components/Routes/PublicRoute';
import { ROUTES } from './const';
import { Auth } from './pages/Auth/Auth';
import { SignIn } from './pages/Auth/SignIn';
import { SignUp } from './pages/Auth/SignUp';
import { Dashboard } from './pages/Main/Dashboard';
import { Main } from './pages/Main/Main';

function App() {
  return (
    <Routes>
      <Route
        element={<PublicRoute redirectTo={ROUTES.MAIN.index} restricted />}
      >
        <Route path={ROUTES.AUTH.index} element={<Auth />}>
          <Route index element={<Navigate to={ROUTES.AUTH.signIn} replace />} />
          <Route path={ROUTES.AUTH.signIn} element={<SignIn />} />
          <Route path={ROUTES.AUTH.signUp} element={<SignUp />} />
        </Route>
      </Route>
      <Route element={<PrivateRoute redirectTo={ROUTES.AUTH.index} />}>
        <Route path={ROUTES.MAIN.index} element={<Main />}>
          <Route
            index
            element={<Navigate to={ROUTES.MAIN.dashboard} replace />}
          />
          <Route path={ROUTES.MAIN.dashboard} element={<Dashboard />} />
          <Route path={ROUTES.MAIN.analytics} element={<div>analytics</div>} />
          <Route
            path={ROUTES.MAIN.categories}
            element={<div>categories</div>}
          />
          <Route path={ROUTES.MAIN.settings} element={<div>settings</div>} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.MAIN.index} replace />} />
    </Routes>
  );
}

export default App;
