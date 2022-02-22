import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClientProvider } from "react-query";
import { ThemeProvider } from './hooks/theme';
import { AuthProvider } from './hooks/auth';
import { queryclient } from './services/queryClient';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryclient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);