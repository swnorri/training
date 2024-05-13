import {
  createBrowserRouter,
  RouterProvider,
  // createRoutesFromElements,
  // Route
} from 'react-router-dom';

import HomePage from './pages/Home.js';
import Products from './pages/Products.js';
import RootLayout from './pages/Root.js';
import ErrorPage from './pages/ErrorPage.js';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [{
      path: '/',
      element: <HomePage />
    }, {
      path: '/products',
      element: <Products />
    }]
  }
]);

// Alternate approach to the above createBrowserRouter
//
// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path="/" element={<HomePage />} />
//     <Route path="/products" element={<Products />} />
//   </Route>
// );
// const router = createBrowserRouter(routeDefinitions);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
