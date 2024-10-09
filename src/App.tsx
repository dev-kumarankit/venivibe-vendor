import { RouterProvider } from "react-router-dom";
import RouterLinks from "./router/Router";
import { Toaster } from "react-hot-toast";
import CustomMap from "./components/customMap/CustomMap";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={RouterLinks} />
      {/* <CustomMap/> */}
    </>
  );
}

export default App;
