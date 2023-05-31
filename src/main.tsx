// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
// // import { QueryClient, QueryClientProvider} from 'react-query'
// import "./style/index.scss";
// import { DarkModeContextProvider } from "./context/darkModeContext";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "./redux/features/Store";
// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <React.StrictMode>
//     <DarkModeContextProvider>
//       <Provider store={store}>
//         <BrowserRouter>
//           <App/>
//         </BrowserRouter>
//       </Provider>
//     </DarkModeContextProvider>
//   </React.StrictMode>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import { QueryClient, QueryClientProvider} from 'react-query'
import "./style/index.scss";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/features/Store";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./query/queryClient";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
