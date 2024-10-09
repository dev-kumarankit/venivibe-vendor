import PuffLoader from "react-spinners/PuffLoader";

const Loader = () => {
  return (
    <div className="min-h-screen w-full fixed inset-0 bg-overlay opacity-80 to-black z-[99999] flex items-center justify-center">
      <PuffLoader color="#00A99D" size={60} />
    </div>
  );
};

export default Loader;
