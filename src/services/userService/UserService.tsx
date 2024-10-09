import { create } from "zustand";
import axiosAPI from "../../utils/InterceptorApi";
import { DEFAULT_PAGE, PAGE_LIMIT } from "../../utils/Constant";

export const userService = create((set) => ({
  getAllUserListingData: {},
  getAllUserListingMeta: {},
  getAllUsersLoading: false,
  getAllUserError: null,

  getSingleUserInfo: {},
  getSingleUserInfoLoading: false,
  getSingleUserInfoError: null,

  editUserLoading: false,
  editUserError: null,
  editUserData: {},
  suspendUnsuspendUserLoading: false,
  suspendUnsuspendError: null,

  approveRejectVendorLoading: false,
  approveRejectVendorerror: null,

  verifyVendorLoading: false,
  verifyVendorError: null,

  removeUserLoading: false,
  removeUserError: null,

  editOrganizerApiLoading: false,
  editOrganizerError: null,

  editPayoutLoading: false,
  editPayoutError: null,

  //fetch all user by admin API
  getAllUsersListingApi: async (data: any, payloadData: any) => {
    try {
      set({ getAllUsersLoading: true });
      const response = await axiosAPI.post(
        `/admin/users?page=${data?.page || DEFAULT_PAGE}&limit=${
          data?.limit || PAGE_LIMIT
        }${data?.status ? `&status=${data?.status}` : ``}`,
        payloadData
      );

      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          getAllUsersLoading: false,
          getAllUserListingData: response?.data?.data?.users,
          getAllUserListingMeta: response?.data?.data?.pagination,
        });
        return response;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ getAllUsersLoading: false, getAllUserError: err });
      return err;
    }
  },

  //user-info API
  getSingleUserInfoApi: async (data: any) => {
    try {
      set({ getSingleUserInfoLoading: true });
      const response = await axiosAPI.get(`admin/user/${data?.id}`);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          getSingleUserInfoLoading: false,
          getSingleUserInfo: response?.data?.data?.user,
        });
        return response;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ getSingleUserInfoLoading: false, getSingleUserInfoError: err });
      return err;
    }
  },

  //user update API
  editUserDetailsApi: async (id: any, formData: any) => {
    try {
      set({ editUserLoading: true });
      const response = await axiosAPI.put(`admin/user/${id}`, formData);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          editUserLoading: false,
          editUserData: response?.data,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ editUserLoading: false, editUserError: err });
      return err;
    }
  },

  //user suspend and unsuspend API
  suspendUnsuspendUserApi: async (data: any) => {
    try {
      set({ suspendUnsuspendUserLoading: true });
      const response = await axiosAPI.patch(`admin/user/${data?.id}/suspend`);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          suspendUnsuspendUserLoading: false,
        });
        return response;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ suspendUnsuspendUserLoading: false, suspendUnsuspendError: err });
      return err;
    }
  },

  //approve/reject vendor API
  approveRejectVendorApi: async (data: any) => {
    try {
      set({ approveRejectVendorLoading: true });
      const response = await axiosAPI.patch(
        `admin/vendor/${data?.id}/toggle-approval`
      );
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          approveRejectVendorLoading: false,
        });
        return response;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ approveRejectVendorLoading: false, approveRejectVendorerror: err });
      return err;
    }
  },

  //verify vendor/user API
  verifyVendorApi: async (data: any) => {
    try {
      set({ verifyVendorLoading: true });
      const response = await axiosAPI.patch(`admin/user/${data?.id}/verify`);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          verifyVendorLoading: false,
        });
        return response;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ verifyVendorLoading: false, verifyVendorError: err });
      return err;
    }
  },
  //remove user API
  removeUserApi: async (id: any) => {
    try {
      set({ removeUserLoading: true });
      const response = await axiosAPI.delete(`admin/user/${id}`);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          removeUserLoading: false,
        });
        return response;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ removeUserLoading: false, removeUserError: err });
      return err;
    }
  },

  //organizer update API
  editOrganizerApi: async (id: any, formData: any) => {
    try {
      set({ editOrganizerApiLoading: true });
      const response = await axiosAPI.put(`admin/organizer/${id}`, formData);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          editOrganizerApiLoading: false,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ editOrganizerApiLoading: false, editOrganizerError: err });
      return err;
    }
  },

  //payout update API
  editPayoutApi: async (id: any, formData: any) => {
    try {
      set({ editPayoutLoading: true });
      const response = await axiosAPI.put(`admin/payout/${id}`, formData);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          editPayoutLoading: false,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ editPayoutLoading: false, editPayoutError: err });
      return err;
    }
  },
}));
