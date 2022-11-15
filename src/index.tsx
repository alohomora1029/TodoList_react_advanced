import { StrictMode } from "react";
import ReactDom from "react-dom";

import { App } from "./App";
import theme from "./theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

ReactDom.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById("root")
);
