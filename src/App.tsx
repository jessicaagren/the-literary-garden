import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss';
import RootLayout from './layouts/RootLayout';
import MyBooksPage from './routes/MyBooksPage/MyBooksPage';
import BrowsePage from './routes/BrowsePage/BrowsePage';
import SearchPage from './routes/SearchPage';
import HomePage from './routes/HomePage';
import BookDetailsPage from './routes/BookDetailsPage/BookDetailsPage';
import { BooksContextProvider } from './contexts/BooksContext';
import StatsPage from './routes/StatsPage/StatsPage';

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
        path: 'my-stats',
        element: <StatsPage />,
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
        path: 'books/:bookid',
        element: <BookDetailsPage />,
      },
    ],
  },
]);

export default function App() {
  return (
    <BooksContextProvider>
      <RouterProvider router={router} />
    </BooksContextProvider>
  );
}
