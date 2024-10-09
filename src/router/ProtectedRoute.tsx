import { Navigate } from "react-router-dom";
import Layout from "../components/layout/layout-2/LayoutV2";
import { user } from "../components/interfaces/Interfacer";

export const verifyAuth = () => {
  const userToken: string | null = localStorage.getItem("auth_token");
  const user = userToken ? { loggedIn: true } : { loggedIn: false };
  return user?.loggedIn;
};

export const getUserdetails = () => {
  const userData: string | null = localStorage.getItem("user_details");
  const tokendata: user = userData ? JSON.parse(userData) : null;
  if (!tokendata) {
    return {
      id: null,
      admin: null,
      email: null,
      phone: null,
      DOB: null,
      facebook_id: null,
      profile_pic: null,
      is_approved: null,
      is_verified: null,
      is_suspend: null,
      organizer_id: null,
      payout_info_id: null,
      name: null,
      role: null,
    };
  }

  const {
    admin,
    DOB,
    facebook_id,
    email,
    id,
    phone_number,
    profile_pic,
    name,
    is_approved,
    is_verified,
    is_suspend,
    organizer_id,
    payout_info_id,
  } = tokendata;

  return {
    id: id,
    profile_pic: profile_pic || null,
    email: email || null,
    admin: admin || null,
    phone_number: phone_number || null,
    DOB: DOB,
    facebook_id: facebook_id || null,
    is_verified: is_verified || null,
    is_approved: is_approved || null,
    is_suspend: is_suspend || null,
    organizer_id: organizer_id,
    payout_info_id: payout_info_id,
    name: name || null,
  };
};

export const getToken = () => {
  const token = localStorage.getItem("auth_token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const ProtectedRoute = () => {
  const isAuth = verifyAuth();
  return (
    <>
      {true ? (
        <>
          <Layout />
        </>
      ) : (
        <Navigate to="authentication/sign-in" replace={true} />
      )}
    </>
  );
};
