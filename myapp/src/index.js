import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import Layout from './component/Layout';
import Error from './component/Error'
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import Vans from './pages/Vans';
import Dashboard from './pages/Host/Dashboard';
import HostVans from './pages/Host/HostVans';
import Income from './pages/Host/Income';
import Reviews from './pages/Host/Reviews';
import HostLayout from './component/HostLayout';

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<Layout />} errorElement={<Error />}>
    <Route index element={<Home />} />
    <Route path="host" element={<HostLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="hostvans" element={<HostVans />} />
      <Route path="income" element={<Income />} />
      <Route path="reviews" element={<Reviews />} />
    </Route>
    <Route path="about" element={<About />} />
    <Route path="vans" element={<Vans />} />
    <Route path="login" element={<Login />} />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
