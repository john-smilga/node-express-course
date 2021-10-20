import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { useUserContext } from '../context/user_context'
import { useGlobalContext } from '../context';

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useGlobalContext();
  return (
    <Route
      {...rest}
      render={() => {
        return user ? children : <Redirect to='/'></Redirect>;
      }}
    ></Route>
  );
};
export default PrivateRoute;
