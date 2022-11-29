import { Route, Routes, Navigate } from 'react-router-dom';
import { Auth } from './pages/Auth/Auth';
import { SignIn } from './pages/Auth/SignIn';
import { SignUp } from './pages/Auth/SignUp';
import { Success } from './pages/Auth/Success';
import { Main } from './pages/Main/Main';

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />}>
        <Route index element={<Navigate to={'signin'} replace={true} />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="success" element={<Success />} />
      </Route>

      <Route path="/" element={<Main />}>
        <Route index element={<Navigate to="/dashboard" replace={true} />} />
        <Route path="/dashboard" element={<div>dashboard</div>} />
        <Route path="/analytics" element={<div>analytics</div>} />
        <Route path="/categories" element={<div>categories</div>} />
        <Route path="/settings" element={<div>settings</div>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
}

export default App;
