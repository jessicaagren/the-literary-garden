import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  ReactNode,
  Dispatch,
} from 'react';
import { BookType } from '../types/BookType';
import { RatingType } from '../types/RatingType';

type ReadBook = BookType & { number_of_pages?: number };

type CommentType = {
  [bookKey: string]: string[];
};

type BooksState = {
  favourites: BookType[];
  read: ReadBook[];
  rating: RatingType;
  comments: CommentType;
};

type BooksAction =
  | { type: 'ADD_FAVOURITE'; payload: BookType }
  | { type: 'REMOVE_FAVOURITE'; payload: string }
  | { type: 'ADD_READ'; payload: BookType }
  | { type: 'REMOVE_READ'; payload: string }
  | { type: 'SET_RATING'; payload: { bookKey: string; rating: number } }
  | { type: 'SET_COMMENT'; payload: { bookKey: string; comment: string } };

type BooksContextType = {
  state: BooksState;
  dispatch: Dispatch<BooksAction>;
};

const BooksContext = createContext<BooksContextType | null>(null);

const initialState: BooksState = {
  favourites: [],
  read: [],
  rating: {},
  comments: {},
};

const booksReducer = (state: BooksState, action: BooksAction): BooksState => {
  switch (action.type) {
    case 'ADD_FAVOURITE':
      return state.favourites.some((book) => book.key === action.payload.key)
        ? state
        : { ...state, favourites: [...state.favourites, action.payload] };

    case 'REMOVE_FAVOURITE':
      return {
        ...state,
        favourites: state.favourites.filter(
          (book) => book.key !== action.payload
        ),
      };

    case 'ADD_READ':
      return state.read.some((book) => book.key === action.payload.key)
        ? state
        : { ...state, read: [...state.read, action.payload] };

    case 'REMOVE_READ':
      return {
        ...state,
        read: state.read.filter((book) => book.key !== action.payload),
      };

    case 'SET_RATING':
      return {
        ...state,
        rating: {
          ...state.rating,
          [action.payload.bookKey]: action.payload.rating,
        },
      };

    case 'SET_COMMENT':
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.bookKey]: [
            ...(state.comments[action.payload.bookKey] || []),
            action.payload.comment,
          ],
        },
      };

    default:
      return state;
  }
};

export const BooksContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(booksReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
  );
};

export const useBooksContext = (): BooksContextType => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error('useBooksContext must be used within BooksContextProvider');
  }
  return context;
};
