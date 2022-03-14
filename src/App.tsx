import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

import { useTheme } from "./hooks/theme";

import Routes from "./routes";
import Loading from "components/Loading";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const App: React.FC = () => {
  const { theme, loading } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      {loading && <Loading />}

      <GlobalStyles />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
