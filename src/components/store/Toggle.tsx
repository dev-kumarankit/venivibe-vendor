import { create } from "zustand";

interface ForgotPasswordEmail {
  forgotPasswordEmail: string[];
  setForgotPasswordEmail: (users: string[]) => void;
}
export const ToggleStore = create<ForgotPasswordEmail>((set) => ({
  forgotPasswordEmail: [],
  setForgotPasswordEmail: (users) => set({ forgotPasswordEmail: users }),
}));

interface FilterData {
  filterCondition: any;
  setForgotPasswordEmail: any;
}
export const FilterData = create<FilterData>((set) => ({
  filterCondition: {},
  setForgotPasswordEmail: (data: any) => set({ filterCondition: data }),
}));

interface FilterToggle {
  filterToggle: any;
  setFilterToggle: any;
}
export const FilterToggle = create<FilterToggle>((set) => ({
  filterToggle: false,
  setFilterToggle: (data: any) => set({ filterToggle: data }),
}));

interface CustomMapToggle {
  customMapToggle: any;
  setCustomMapToggle: any;
}
export const CustomMapToggle = create<CustomMapToggle>((set) => ({
  customMapToggle: false,
  setCustomMapToggle: (data: any) => set({ customMapToggle: data }),
}));

interface stepForm {
  stepper: any;
  setStepper: any;
}
export const StepForm = create<stepForm>((set) => ({
  stepper: "0",
  setStepper: (data: any) => set({ stepper: data }),
}));

interface ticketToggle {
  showTicket: any;
  setShowTicket: any;
}
export const TicketToggle = create<ticketToggle>((set) => ({
  showTicket: false,
  setShowTicket: (data: any) => set({ showTicket: data }),
}));







interface mapLocationDetails {
  locationDetails: { [key: string]: string };
  setLocationDetails: (data: { [key: string]: string }) => void;
}

export const MapLocationDetails = create<mapLocationDetails>((set) => ({
  locationDetails: {},
  setLocationDetails: (data) => set({ locationDetails: data }),
}));





interface UniqueToggle {
  showUnique: any;
  setShowUnique: any;
}
export const UniqueToggle = create<UniqueToggle>((set) => ({
  showUnique: false,
  setShowUnique: (data: any) => set({ showUnique: data }),
}));

interface CustomStore {
  customData: any;
  setCustomData: any;
}

export const customStore = create<CustomStore>((set) => ({
  customData: [],
  setCustomData: (data: any) => set((state) => ({ customData: [...state.customData, data] })),
}));

interface uniqeStore {
  uniqueData: any;
  setUniqeData: any;
}

export const UniqeStore = create<uniqeStore>((set) => ({
  uniqueData: [],
  setUniqeData: (data: any) => set((state) => ({ uniqueData: [...state.uniqueData, data] })),
}));