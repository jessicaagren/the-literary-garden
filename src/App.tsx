import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss';
import RootLayout from './layouts/RootLayout';
import MyBooksPage from './routes/MyBooksPage';
import BrowsePage from './routes/BrowsePage';
import SearchPage from './routes/SearchPage';
import HomePage from './routes/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'my-books',
        element: <MyBooksPage />,
      },
      {
        path: 'browse',
        element: <BrowsePage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
