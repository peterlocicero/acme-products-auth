import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchProducts, logout } from './store';
import { Link, Routes, Route } from 'react-router-dom';
import Products from './Products';
import Login from './Login';

const App = ()=> {
  const dispatch = useDispatch();
  const { products, auth } = useSelector(state => state);
  useEffect(()=> {
    dispatch(fetchProducts());
    dispatch(loginWithToken());
  }, []);

  return (
    <div>
      <h1><Link to='/'>Acme Product Search</Link></h1>
      <Link to='/products'>Products ({ products.length })</Link>
      {
        !auth.id ? <Link to='/login'>Login</Link> :
          <button onClick={ ()=> dispatch(logout())}>Logout {auth.username }</button>
      }
      <Routes>
        <Route path='/products' element={ <Products /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/products/:filterString' element={ <Products /> } />
      </Routes>
    </div>
  );
};

export default App;
