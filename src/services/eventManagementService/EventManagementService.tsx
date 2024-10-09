import { create } from "zustand";
import axiosEventApi from "../../utils/InterceptorEventApi";
import { DEFAULT_PAGE, PAGE_LIMIT } from "../../utils/Constant";
import { apiFilterValidation } from "../../utils/api/apiFilter";

export const eventManagementService = create((set) => ({
  getTotalEventsData: {},
  getTotalEventsLoading: false,
  getTotalEventsError: null,

  getAllEventsData: {},
  getAllEventsMeta: {},
  getAllEventsLoading: false,
  getAllEventsError: null,

  getSingleEventData: {},
  getSingleEventLoading: false,
  getSingleEventsError: null,

  getTotalActiveEventsLoading: false,
  getTotalActiveEventsError: null,

  createEventData: {},
  createEventLoading: false,
  createEventError: null,

  upComingEventsData: {},
  upComingEventsDetailsLoading: false,
  upComingEventDetailsError: null,

  createEventTicketData: {},
  createEventTicketLoading: false,
  createEventTicketError: null,

  editEventLoading: false,
  editEventError: null,

  toggleApprovalEventLoading: false,
  toggleEventApprovalError: null,

  refundData: [],
  eventCategoryData: [],

  getEventTickLoading: false,
  getEventTicketData: [],
  getEventTicketErr: null,

  getSingleEventTickLoading : false,
  getSingleEventTicketData: [],
  getSingleEventTicketErr: null,

  uploadEventPdfLoading: false,
  uploadEventPdfData: [],
  uploadEventPdfErr: null,

  addCustomizationLoading: false,
  addCustomizationData: [],
  addCustomizationErr: null,

  getEventCustomizationLoading: false,
  getEventCustomizationData: [],
  getEventCustomizationErr: null,

  viewCustomizationLoading: false,
  getCustomizationData: [],
  viewCustomizationErr: null,

  editCustomizationLoading: false,
  editCustomizationData: [],
  editCustomizationErr: null,

  editSingleEventLoading: false,
  editSingleEventData: [],
  editSingleEventErr: null,



  //fetch all events by admin API
  listAllEventDetailsApi: async (data: any) => {
    const { dateFrom, dateTo, limit, page, type } = data;
    const urlArray = [
      {
        name: "dateFrom",
        value: dateFrom,
      },
      {
        name: "dateTo",
        value: dateTo,
      },
      {
        name: "limit",
        value: limit,
      },
      {
        name: "page",
        value: page,
      },
      {
        name: "type",
        value: type,
      },
    ];

    try {
      set({ getAllEventsLoading: true });

      let filteredURL = apiFilterValidation(urlArray, `admin/events?`);
      const response = await axiosEventApi.get(filteredURL);

      const { status } = response || { message: "error" };

      if (status == 200) {
        set({
          getAllEventsLoading: false,
          getAllEventsData: response?.data?.data?.events,
          getAllEventsMeta: response?.data?.data?.pagination,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ getAllEventsLoading: false, getAllEventsError: err });
      return err;
    }
  },

  //fetch single event API
  listSingleEventDetailsApi: async (data: any) => {
    try {
      set({ getSingleEventLoading: true });
      const response = await axiosEventApi.get(`admin/event/${data?.id}`);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          getSingleEventLoading: false,
          getSingleEventData: response?.data?.data?.event,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ getSingleEventLoading: false, getSingleEventsError: err });
      return err;
    }
  },

  //create event API
  createEventApi: async (data: any) => {
    try {
      set({ createEventLoading: true });
      const response = await axiosEventApi.post(`admin/event`, data);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          createEventLoading: false,
          createEventData: response?.data,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ createEventLoading: false, createEventError: err });
      return err;
    }
  },

  //total event API
  listTotalEventDetailsApi: async () => {
    try {
      set({ getTotalEventsLoading: true });
      const response = await axiosEventApi.get(`admin/totalEvent`);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          getTotalEventsLoading: false,
          getTotalEventsData: response?.data,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ getTotalEventsLoading: false, getTotalEventsError: err });
      return err;
    }
  },

  // refund-Policy API
  refundPolicy: async () => {
    try {
      set({ refundLoading: true });
      const response = await axiosEventApi.get(`admin/refund-policy`);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          refundLoading: false,
          refundData: response?.data,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ refundLoading: false, refundErr: err });
      return err;
    }
  },

  // refund-Policy API
  eventCategory: async () => {
    try {
      set({ eventCategoryLoading: true });
      const response = await axiosEventApi.get(`admin/event-category`);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          eventCategoryLoading: false,
          eventCategoryData: response?.data,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ eventCategoryLoading: false, eventCategoryErr: err });
      return err;
    }
  },

  //total active event API
  listTotalActiveEventsApi: async () => {
    try {
      set({ getTotalActiveEventsLoading: true });
      const response = await axiosEventApi.get(`/admin/total-active-event`);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          getTotalActiveEventsLoading: false,
          getTotalActiveEventsData: response?.data,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({
        getTotalActiveEventsLoading: false,
        getTotalActiveEventsError: err,
      });
      return err;
    }
  },

  //update event api API
  editEventApi: async (id: any, editData: any) => {
    try {
      set({ editEventLoading: true });
      const response = await axiosEventApi.put(`admin/event/${id}`, editData);
      const { status } = response || { message: "error" };

      if (status == 200) {
        set({
          editEventLoading: false,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ editEventLoading: false, editEventError: err });
      return err;
    }
  },

  // toggle approval event API
  toggleApprovalEventApi: async (id: any) => {
    try {
      set({ toggleApprovalEventLoading: true });
      const response = await axiosEventApi.patch(
        `admin/event/${id}/toggle-approval`
      );
      const { status } = response || { message: "error" };

      if (status == 200) {
        set({
          toggleApprovalEventLoading: false,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ toggleApprovalEventLoading: false, toggleEventApprovalError: err });
      return err;
    }
  },

  // upcoming events details API
  upComingEventsDetailsApi: async () => {
    try {
      set({ upComingEventsDetailsLoading: true });
      const response = await axiosEventApi.get(`admin/events/upcoming`);
      const { status } = response || { message: "error" };

      if (status == 200) {
        set({
          upComingEventsDetailsLoading: false,
          upComingEventsData: response?.data?.data?.events,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({
        upComingEventsDetailsLoading: false,
        upComingEventDetailsError: err,
      });
      return err;
    }
  },

  // create event ticket API
  createEventTicketApi: async (data: any) => {
    try {
      set({ createEventTicketLoading: true });
      const response = await axiosEventApi.post(`admin/ticket-category`, data);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          createEventTicketLoading: false,
          createEventTicketData: response?.data,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ createEventTicketLoading: false, createEventTicketError: err });
      return err;
    }
  },

  getEventTicketApi: async (data: any) => {
    try {
      set({ getEventTickLoading: true });
      const response = await axiosEventApi.get(
        `admin/event/${data?.id}/ticket-category`
      );
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          getEventTickLoading: false,
          getEventTicketData: response?.data?.data,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ getEventTickLoading: false, getEventTicketErr: err });
      return err;
    }
  },


  getSingleEventTicketApi: async (data: any) => {
    try {
      set({ getSingleEventTickLoading: true });
      const response = await axiosEventApi.get(
        `admin/ticket-category/${data?.id}/`
      );
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          getSingleEventTickLoading: false,
          getSingleEventTicketData: response?.data?.data,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ getSingleEventTickLoading: false, getSingleEventTicketErr: err });
      return err;
    }
  },
  

  uploadEventPdfApi: async ({ id, data }: any) => {
    try {
      set({ uploadEventPdfLoading: true });
      const response = await axiosEventApi.post(`admin/event/${id}/pdfs`, data);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          uploadEventPdfLoading: false,
          uploadEventPdfData: response?.data,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ uploadEventPdfLoading: false, uploadEventPdfErr: err });
      return err;
    }
  },

  addCustomizationApi: async (data: any) => {
    try {
      set({ addCustomizationLoading: true });
      const response = await axiosEventApi.post(
        `admin/event/customization`,
        data
      );
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          addCustomizationLoading: false,
          addCustomizationData: response?.data,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ addCustomizationLoading: false, addCustomizationErr: err });
      return err;
    }
  },

  getEventCustomization: async (id: any) => {
    try {
      set({ getEventCustomizationLoading: true });
      const response = await axiosEventApi.get(
        `admin/event/${id}/customization`
      );
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          getEventCustomizationLoading: false,
          getEventCustomizationData: response?.data,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({
        getEventCustomizationLoading: false,
        getEventCustomizationErr: err,
      });
      return err;
    }
  },

  viewCustomization: async (id: any) => {
    try {
      set({ viewCustomizationLoading: true });
      const response = await axiosEventApi.get(
        `admin/event/${id}/customization`
      );
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          viewCustomizationLoading: false,
          getCustomizationData: response?.data,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ viewCustomizationLoading: false, viewCustomizationErr: err });
      return err;
    }
  },

  editCustomization: async (id: any) => {
    try {
      set({ editCustomizationLoading: true });
      const response = await axiosEventApi.put(`admin/customization/${id}`);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          editCustomizationLoading: false,
          editCustomizationData: response?.data,
        });
        return response?.data;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ editCustomizationLoading: false, editCustomizationErr: err });
      return err;
    }
  },
  updateSingleEventTicketApi: async (id: any, formData: any) => {
    try {
      // Set the loading state to true
      set({ editSingleEventLoading: true });
  
      // Make the PUT request to update the ticket with the form data
      const response = await axiosEventApi.put(`admin/ticket-category/${id}`, formData);
  
      // Destructure the response status
      const { status } = response || { message: "error" };
  
      // If the request is successful
      if (status === 200) {
        set({
          editSingleEventLoading: false,
          editSingleEventData: response?.data,
        });
        return response?.data;
      } else {
        throw new Error("Failed to update the ticket");
      }
    } catch (err) {
      // Handle errors and set loading/error states
      set({ editSingleEventLoading: false, editSingleEventErr: err });
      return err;
    }
  },
  
}));
