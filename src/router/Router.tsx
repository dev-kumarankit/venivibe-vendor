import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { Suspense } from "react";
// import DashboardDefault from "../pages/dashboards/DashboardDefault";
import SignIn from "../pages/authenticaton/signIn/SignIn";
// import ResetPassword from "../pages/authenticaton/resetPassword/ResetPassword";
// import ForgotPassword from "../pages/authenticaton/forgotPassword/ForgotPassword";
// import Events from "../pages/events/Events";
// import Vendor from "../pages/userManagement/Vendor";
// import User from "../pages/userManagement/User";
// import EventDetails from "../pages/events/EventDetails";
// import UserDetails from "../pages/userManagement/UserDetails";
// import VendorDetails from "../pages/userManagement/VendorDetails";
// import ChangePassword from "../pages/authenticaton/changePasword/ChangePassword";
// import Ticketdetails from "../pages/events/TicketDetails";
// import SingleTicketDetails from "../pages/events/SingleTicketDetails";
// import CreateEvent from "../pages/events/CreateEvent";
// import UploadItems from "../components/createEvent/uploadItems/UploadItems";
// import EventCustomization from "../pages/events/EventCustomisation";
import Ticket from "../components/createEvent/ticket/Ticket";
import ForgotPassword from "../pages/authenticaton/forgotPassword/ForgotPassword";
import ResetPassword from "../pages/authenticaton/resetPassword/ResetPassword";
import SignUp from "../pages/authenticaton/signUp/SignUp";

const RouterLinks = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* route and child route for authentication  */}

      <Route
        path="authentication/sign-in"
        element={<Suspense fallback={""}>{<SignIn />}</Suspense>}
      />

      <Route
        path="authentication/forgot-password"
        element={<Suspense fallback={""}>{<ForgotPassword />}</Suspense>}
      />
      <Route
        path="authentication/reset-password"
        element={<Suspense fallback={""}>{<ResetPassword />}</Suspense>}
      />
      <Route
        path="authentication/sign-up"
        element={<Suspense fallback={""}>{<SignUp />}</Suspense>}
      />
      {/* <Route
        path="authentication/change-password"
        element={<Suspense fallback={""}>{<ChangePassword />}</Suspense>}
      /> */}

      <Route path="/" element={<ProtectedRoute />}>
        {/* <Route
          path="/"
          element={<Suspense fallback={""}>{<DashboardDefault />}</Suspense>}
        />
        <Route
          path="/vendor-listing"
          element={<Suspense fallback={""}>{<Vendor />}</Suspense>}
        />
        <Route
          path="/user-listing"
          element={<Suspense fallback={""}>{<User />}</Suspense>}
        />
        <Route
          path="/user/:id"
          element={<Suspense fallback={""}>{<UserDetails />}</Suspense>}
        />

        <Route
          path="/vendor-listing/:id"
          element={<Suspense fallback={""}>{<VendorDetails />}</Suspense>}
        />

        <Route
          path="/events"
          element={<Suspense fallback={""}>{<Events />}</Suspense>}
        />
        <Route
          path="events/event-detail/:id"
          element={<Suspense fallback={""}>{<EventDetails />}</Suspense>}
        />
        <Route
          path="events/view-event-customization"
          element={<Suspense fallback={""}>{<EventCustomization />}</Suspense>}
        />
        <Route
          path="events/ticket-details"
          element={<Suspense fallback={""}>{<Ticketdetails />}</Suspense>}
        /> */}

        <Route
          path="events/add-ticket"
          element={<Suspense fallback={""}>{<Ticket />}</Suspense>}
        />

        {/* <Route
          path="events/ticket-details/:id"
          element={<Suspense fallback={""}>{<SingleTicketDetails />}</Suspense>}
        /> */}
        {/* <Route
          path="events/create-event"
          element={<Suspense fallback={""}>{<CreateEvent />}</Suspense>}
        />
        <Route
          path="events/uploadItems"
          element={<Suspense fallback={""}>{<UploadItems />}</Suspense>}
        /> */}
      </Route>
    </Route>
  ),
  {
    basename: "/",
  }
);

export default RouterLinks;
