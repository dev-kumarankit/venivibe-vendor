import { create } from "zustand";
import axiosAPI from "../../utils/InterceptorApi";
import axiosEventApi from "../../utils/InterceptorEventApi";

export const ticketService = create((set) => ({
  createTicketCategoryData: {},
  createTicketCategoryLoading: false,
  createTicketCategoryError: null,

  editTicketCategoriesData: {},
  editTicketCategoryLoading: false,
  editTicketCategoryError: null,

  listTicketCategoriesData: {},
  listTicketCategoryLoading: false,
  listTicketCategoryError: null,

  addTicketPriceData: {},
  addTicketPriceLoading: false,
  addTicketPriceError: null,

  createPromocodeLoading: false,
  createPromocodeError: null,

  getAllPromocodeApiLoading: false,
  getAllPromocodeError: null,

  getPromoCodeByIdLoading: false,
  getPromoCodeByIdError: null,

  updatePromoCodeLoading: false,
  updatePromocodeError: null,

  deletePromoCodeLoading: false,
  deletePromocodeError: null,

  //create ticket categories API
  createTicketCategoriesApi: async (data: any) => {
    try {
      set({ createTicketCategoryLoading: true });
      const response = await axiosEventApi.post(`admin/ticket-category`, data);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          createTicketCategoryLoading: false,
          createTicketCategoryData: response?.data,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({
        createTicketCategoryLoading: false,
        createTicketCategoryError: err,
      });
      return err;
    }
  },

  //edit ticket category API
  editTicketCategoriesApi: async (data: any, id: any) => {
    try {
      set({ editTicketCategoryLoading: true });
      const response = await axiosAPI.put(`admin/ticket-category/${id}`, data);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          editTicketCategoryLoading: false,
          editTicketCategoriesData: response?.data,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({
        editTicketCategoryLoading: false,
        editTicketCategoryError: err,
      });
      return err;
    }
  },

  //list ticket category data API
  listTicketCategoryEventApi: async (data: any) => {
    try {
      set({ listTicketCategoryLoading: true });
      const response = await axiosAPI.get(
        `admin/event/${data?.id}/ticket-category`
      );
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          listTicketCategoryLoading: false,
          listTicketCategoriesData: response?.data,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({
        listTicketCategoryLoading: false,
        listTicketCategoryError: err,
      });
      return err;
    }
  },

  //add ticket price API
  addTicketPriceApi: async (data: any) => {
    try {
      set({ addTicketPriceLoading: true });
      const response = await axiosAPI.patch(`admin/ticket-price/${data?.id}`);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          addTicketPriceLoading: false,
          addTicketPriceData: response?.data,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({
        addTicketPriceLoading: false,
        addTicketPriceError: err,
      });
      return err;
    }
  },

  // create promocode API
  createPromocodeApi: async (data: any) => {
    try {
      set({ createPromocodeLoading: true });
      const response = await axiosAPI.post(`admin/promocode`, data);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          createPromocodeLoading: false,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({
        createPromocodeLoading: false,
        createPromocodeError: err,
      });
      return err;
    }
  },

  // get all promocode API
  getAllPromocodeApi: async () => {
    try {
      set({ getAllPromocodeApiLoading: true });
      const response = await axiosAPI.get(`admin/promocode`);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          getAllPromocodeApiLoading: false,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({
        getAllPromocodeApiLoading: false,
        getAllPromocodeError: err,
      });
      return err;
    }
  },

  // get promocode by id API
  getPromoCodeById: async (data: any) => {
    try {
      set({ getPromoCodeByIdLoading: true });
      const response = await axiosAPI.get(`admin/promocode/${data?.id}`);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          getPromoCodeByIdLoading: false,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({
        getPromoCodeByIdLoading: false,
        getPromoCodeByIdError: err,
      });
      return err;
    }
  },

  // update promocode API
  updatePromoCodeApi: async (data: any) => {
    try {
      set({ updatePromoCodeLoading: true });
      const response = await axiosAPI.put(`admin/promocode/${data?.id}`);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          updatePromoCodeLoading: false,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({
        updatePromoCodeLoading: false,
        updatePromocodeError: err,
      });
      return err;
    }
  },

  // delete promocode API
  deletePromoCodeApi: async (data: any) => {
    try {
      set({ deletePromoCodeLoading: true });
      const response = await axiosAPI.delete(`admin/promocode/${data?.id}`);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          deletePromoCodeLoading: false,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({
        deletePromoCodeLoading: false,
        deletePromocodeError: err,
      });
      return err;
    }
  },
}));
