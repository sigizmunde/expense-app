import { Route, Routes, Navigate } from 'react-router-dom';
import { Auth } from './pages/Auth/Auth';
import { Main } from './pages/Main/Main';

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />}>
        <Route index element={<Navigate to={'signin'} replace={true} />} />
        <Route path="signin" element={<div>sign in</div>} />
        <Route path="signup" element={<div>sign up</div>} />
        <Route path="reset" element={<div>reset password</div>} />
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
