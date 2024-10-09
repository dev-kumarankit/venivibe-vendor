import { useEffect, useState } from "react";
import dummyImg from "../../../assets/dummyImage.png";

const ImageInitials = (props: any) => {
  const { imageUrl, alt, className }: any = props || {};

  const [imageExists, setImageExists] = useState(false);

  useEffect(() => {
    const checkImage = () => {
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        setImageExists(true);
      };

      img.onerror = () => {
        setImageExists(false);
      };
    };

    imageUrl ? checkImage() : setImageExists(false);
  }, [imageUrl]);

  return (
    <div
      className={`font-bold  flex items-center justify-center border-transparent  dark:border-darkModeBorder overflow-hidden w-8 ${className}`}
    >
      {imageExists ? (
        <img src={imageUrl} alt={alt} className="object-contain" />
      ) : (
        <img
          src={dummyImg}
          alt={alt}
          className="object-contain"
          draggable={false}
        />
      )}
    </div>
  );
};

export default ImageInitials;
