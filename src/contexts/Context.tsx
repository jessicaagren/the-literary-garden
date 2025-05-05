import {
  createContext,
  Dispatch,
  useContext,
  useMemo,
  useReducer,
} from 'react';

// Typ: En bok som kan sparas som favorit
export type FavouriteBook = {
  key: string;
  title: string;
  author: string[];
  cover_i: number;
};

// Typa contexten
type FavouritesContextType = {
  state: FavouriteBook[];
  dispatch: Dispatch<FavouritesReducerAction>;
};

// Skapa context
const FavouritesContext = createContext<FavouritesContextType | null>(null);

// Typa actions
export type FavouritesReducerAction =
  | { type: 'ADD'; payload: FavouriteBook }
  | { type: 'REMOVE'; payload: string }
  | { type: 'RESET' };

// Reducer
const favouritesReducer = (
  state: FavouriteBook[],
  action: FavouritesReducerAction
): FavouriteBook[] => {
  switch (action.type) {
    case 'ADD':
      if (state.find((book) => book.key === action.payload.key)) {
        return state; // undvik dubbletter
      }
      return [...state, action.payload];
    case 'REMOVE':
      return state.filter((book) => book.key !== action.payload);
    case 'RESET':
      return [];
    default:
      return state;
  }
};

// Provider-komponent
export const FavouritesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(favouritesReducer, []);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

// Custom hook
export const useFavourites = (): FavouritesContextType => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error(
      'useFavourites must be used within a FavouritesContextProvider'
    );
  }
  return context;
};
