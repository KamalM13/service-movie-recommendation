import { toast } from "sonner";
import React from "react";
import { t } from "i18next";
import imageCompression from "browser-image-compression";

export const CName = "Nova";
export const CLogo = "/logo.png";
export const CLogoAlt = "Nova Logo";
export const CTaxNo = "582-473-233";
export const CEmail = "novaegtech@gmail.com";
export const CPhone = "+201221575493";
export const CAddress = "";
export const CDescription = "";
export const CFacebook = "";
export const CWhatsApp = "";
export const CInstagram = "";
export const CLinkedin = "";
export const CNumbers = ["+201115124773"];
export const CBranches = [

];


export const DisplaySonner = (notification: any) => {
  if (notification) {
    const timestamp = new Date().toLocaleString();
    toast(t(notification), {
      description: timestamp,
      action: {
        label: "Close",
        onClick: () => console.log("Close"),
      },
    });
  }
};

export const formatContent = (text: string) => {
  return text.split("\n").map((str, index) => (
    <React.Fragment key={index}>
      {str}
      <br />
    </React.Fragment>
  ));
};

export const uploadImages = async (images: any) => {
  const ImagesUrl = Array.isArray(images) ? images : [images];
  const uploadedUrls = [];

  for (const img of ImagesUrl) {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: "image/webp",
    };

    try {
      const compressedImage = await imageCompression(img, options);
      const formData = new FormData();
      formData.append("file", compressedImage);
      formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET_MAIN);

      const response = await fetch(import.meta.env.VITE_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      uploadedUrls.push(data.secure_url);
    } catch (error) {
      console.error("Error compressing or uploading image:", error);
    }
  }

  return uploadedUrls;
};
