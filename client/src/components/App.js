import React from "react";
import Header from "./Header";
import InfoFab from "./InfoFab";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

export default ({ children }) => {
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: "dark",
          primary: { main: "#ff8a80" },
          secondary: { main: "#ff1744" },
        },
      }),
    []
  );

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header />
        <InfoFab />
        {children}
      </ThemeProvider>
    </div>
  );
};
