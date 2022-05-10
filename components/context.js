import { createContext, useState } from 'react';


const AppContext = createContext({
  isAuthenticated: true,
  cart: { items: [], total: 0 },
  addItem: () => {},
  removeItem: () => {},
  user: null,
  setUser: () => {}
});

export { AppContext };
