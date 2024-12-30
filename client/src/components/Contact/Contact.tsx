import Loading from "../Loading/Loading";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useState } from "react";
import { t } from "i18next";
import { useAuth } from "../../context/AuthContext";
import { CName, DisplaySonner } from "../../utils/utils";
import api from "../../utils/apiClient";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const handleSendMessage = async (
  name: string,
  email: string,
  phone: string,
  message: string,
  type: string,
  files: File[],
  setLoading: (loading: boolean) => void,
  setName: (name: string) => void,
  setEmail: (email: string) => void,
  setPhone: (phone: string) => void,
  setMessage: (message: string) => void,
  setType: (type: string) => void,
  setFiles: (files: File[]) => void
) => {
  try {
    setLoading(true);

    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          import.meta.env.VITE_UPLOAD_PRESET_MAIN
        );

        // Check file type
        const validTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "video/mp4",
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          "application/vnd.ms-powerpoint",
          "application/x-rar-compressed",
          "application/zip",
          "application/x-zip-compressed",
          "multipart/x-zip",
          "application/x-7z-compressed",
          "application/x-tar",
          "application/x-gzip",
          "application/x-bzip2",
          "application/x-bzip",
        ];
        if (!validTypes.includes(file.type)) {
          DisplaySonner("Unsupported file type");
          setLoading(false);
          return;
        }

        // Check file size
        if (file.size > 1024 * 1024 * 5) {
          DisplaySonner("File size should be less than 5MB");
          setLoading(false);
          return;
        }

        const response = await fetch(import.meta.env.VITE_UPLOAD_URL, {
          method: "POST",
          body: formData,
        });

        // Handle non-200 responses
        if (!response.ok) {
          DisplaySonner("Failed to upload file");
          setLoading(false);
          return;
        }

        const data = await response.json();
        return data.secure_url;
      })
    );

    const res = await api.post("/sendmessage", {
      name,
      email,
      phone,
      message,
      type,
      files: uploadedImages,
    });
    DisplaySonner(res.data.message);
    if (res.status === 200) {
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setType("");
      setFiles([]);
    }
  } catch (e) {
    console.error(e);
    DisplaySonner("An error occurred. Please try again later.");
  } finally {
    setLoading(false);
  }
};
export default function Contact() {
  const auth = useAuth();
  const [name, setName] = useState(
    `${auth?.user?.firstName || ""} ${auth?.user?.lastName || ""}`.trim()
  );
  const [email, setEmail] = useState(auth?.user?.email || "");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState(auth?.user?.phone || "");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Convert FileList to an array and add new files to the existing list
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  return (
    <div className="container px-4 md:px-6 flex">
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        <div className="space-y-2">
          <h2 className=" text-3xl font-bold tracking-tighter sm:text-4xl">
            {t("Talk with us")}
          </h2>
          <p className="text-gray-600 md:text-xl">
            {t(
              "Have a question or need help? Fill out the form and we'll get back to you as soon as possible."
            )}
          </p>
        </div>
        <div className="space-y-4 text-left">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2 ">
                {t("Full Name")} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                required
                placeholder={t("Please enter your full name")}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="flex items-center gap-2 ">
                {t("Phone Number")} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phoneNumber"
                type="number"
                min={0}
                required
                placeholder={t("Please enter your phone number")}
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 ">
              {t("Email")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              required
              placeholder={t("Please enter your email address")}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-4">
            <Label className="">
              {t("Type of Message")} <span className="text-red-500">*</span>
            </Label>

            <Select value={type} onValueChange={(value) => setType(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Type of Message" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{t("Select Type of Message")}</SelectLabel>
                  <SelectItem value="Support">{t("Support")}</SelectItem>
                  <SelectItem value="Feedback">{t("Feedback")}</SelectItem>
                  <SelectItem value="General Inquiry">
                    {t("General Inquiry")}
                  </SelectItem>
                  <SelectItem value="Other">{t("Other")}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center gap-2 ">
              {t("Your Message or Inquiry")}{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              rows={5}
              required
              placeholder={t("Please enter your message or inquiry")}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center gap-2 ">
              {t("Files")} {t("(Optional)")}
            </Label>
            <Input id="file" type="file" onChange={handleFileChange} multiple />
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full max-w-[200px]"
              disabled={loading}
              onClick={() =>
                handleSendMessage(
                  name,
                  email,
                  phone,
                  message,
                  type,
                  files,
                  setLoading,
                  setName,
                  setEmail,
                  setPhone,
                  setMessage,
                  setType,
                  setFiles
                )
              }
            >
              {loading ? (
                <Loading withTitle={true} />
              ) : (
                <>
                  {t("Send to")} {t(CName)}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
