/**
 * AppProviders
 *
 * Combined context providers wrapper for the entire application.
 * Wraps all contexts in the correct order for proper dependency injection.
 */

import React from 'react';
import { AuthProvider } from './AuthContext';
import { GameProvider } from './GameContext';
import { InventoryProvider } from './InventoryContext';
import { CareerProvider } from './CareerContext';

export const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <InventoryProvider>
        <CareerProvider>
          <GameProvider>
            {children}
          </GameProvider>
        </CareerProvider>
      </InventoryProvider>
    </AuthProvider>
  );
};
