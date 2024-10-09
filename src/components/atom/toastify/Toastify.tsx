import toast from "react-hot-toast";

export const getToast = (type: any, message: any) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;

    default:
  }
};
