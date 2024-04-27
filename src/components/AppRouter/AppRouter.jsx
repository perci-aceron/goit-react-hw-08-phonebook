import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import Header from '../Header/Header';
import { PrivateRoute } from '../PrivateRoute';
import { RestrictedRoute } from '../RestrictedRoute';

const AppRouter = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<RestrictedRoute redirectTo="/*" component={<Login />} />} />
        <Route path="/registration" element={<RestrictedRoute redirectTo="/*" component={<Registration />} />} />
        <Route path="/*" element={<PrivateRoute redirectTo="/login" component={<App />} />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
