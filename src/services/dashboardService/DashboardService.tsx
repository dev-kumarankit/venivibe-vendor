import { create } from "zustand";
import axiosAPI from "../../utils/InterceptorApi";
import axiosEventApi from "../../utils/InterceptorEventApi";

export const dashboardService = create((set) => ({
  getTotalUserData: {},
  getTotalUsersLoading: false,
  getTotalUserError: null,

  getTotalVendorData: {},
  getTotalVendorLoading: false,
  getTotalvendorError: null,

  getDashboardSummaryDetails: {},
  getDashboardSummaryLoading: false,
  getDashboardSummaryError: null,

  //totl user count API
  listTotalUsersApi: async () => {
    try {
      set({ getTotalUsersLoading: true });
      const response = await axiosAPI.get(`/admin/total-user`);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          getTotalUsersLoading: false,
          getTotalUserData: response?.data,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({
        getTotalUsersLoading: false,
        getTotalUserError: err,
      });
      return err;
    }
  },

  //total vendor count API
  listTotalVendorApi: async () => {
    try {
      set({ getTotalVendorLoading: true });
      const response = await axiosAPI.get(`admin/total-vendor`);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          getTotalVendorLoading: false,
          getTotalVendorData: response?.data,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({
        getTotalVendorLoading: false,
        getTotalvendorError: err,
      });
      return err;
    }
  },

  //dashboard summary API
  listDashboardSummaryApi: async () => {
    try {
      set({ getDashboardSummaryLoading: true });
      const response = await axiosEventApi.get(`admin/dashboard/summary`);

      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          getDashboardSummaryLoading: false,
          getDashboardSummaryDetails: response?.data?.data,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({
        getDashboardSummaryLoading: false,
        getDashboardSummaryError: err,
      });
      return err;
    }
  },
}));
