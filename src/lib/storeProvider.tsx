
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store'; // Adjust the import according to your file structure

const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;