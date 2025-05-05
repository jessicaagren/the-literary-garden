import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss';
import RootLayout from './layouts/RootLayout';
import MyBooksPage from './routes/MyBooksPage';
import BrowsePage from './routes/BrowsePage';
import SearchPage from './routes/SearchPage';
import HomePage from './routes/HomePage';
import BookDetailsPage from './routes/BookDetailsPage/BookDetailsPage';
import { FavouritesContextProvider } from './contexts/Context';

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
      {
        path: 'search/:bookid',
        element: <BookDetailsPage />,
      },
    ],
  },
]);

export default function App() {
  return (
    <FavouritesContextProvider>
      <RouterProvider router={router} />
    </FavouritesContextProvider>
  );
}
