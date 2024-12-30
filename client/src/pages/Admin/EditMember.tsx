import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { useEffect, useState } from "react";
import { DisplaySonner } from "../../utils/utils";
import { Link, useParams } from "react-router-dom";
import { t } from "i18next";
import api from "../../utils/apiClient";

const EditMember = () => {
  const [image, setImage] = useState<File | null>(null);
  const [moreImages, setMoreImages] = useState<File[] | null>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [existingProfileImage, setExistingProfileImage] = useState("");
  const [existingMoreImages, setExistingMoreImages] = useState<string[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/getmember/${id}`);
        const member = res.data;

        setName(member.username);
        setRole(member.role);
        setDescription(member.description);
        setExistingProfileImage(member.profileImage);
        setExistingMoreImages(member.images || []);
      } catch (err) {
        console.error("Failed to fetch member data:", err);
        DisplaySonner(t("Failed to load member data.")); // Show error message
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (!name || !role || !description) {
        DisplaySonner(t("Please fill out all fields."));
        return;
      }

      let profileImageUrl = existingProfileImage; // Keep existing image by default

      // Only upload a new profile image if a new one is selected
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET_MAIN);

        const response = await fetch(import.meta.env.VITE_UPLOAD_URL, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        profileImageUrl = data.secure_url;
      }

      const moreImagesUrls = existingMoreImages.slice(); // Start with existing images

      // Only upload new images if any are selected
      if (moreImages) {
        for (const img of moreImages) {
          const formDataMoreImages = new FormData();
          formDataMoreImages.append("file", img);
          formDataMoreImages.append(
            "upload_preset",
            import.meta.env.VITE_UPLOAD_PRESET_MAIN
          );

          const responseMoreImages = await fetch(import.meta.env.VITE_UPLOAD_URL, {
            method: "POST",
            body: formDataMoreImages,
          });
          const dataMoreImages = await responseMoreImages.json();
          moreImagesUrls.push(dataMoreImages.secure_url);
        }
      }

      const res = await api.put("/updatemember", {
        id,
        profileImage: profileImageUrl,
        name,
        role,
        description,
        images: moreImagesUrls,
      });

      DisplaySonner(res.data.message);

      // Reset form fields after submission
      setImage(null);
      setMoreImages(null);
      setName("");
      setRole("");
      setDescription("");
    } catch (err) {
      console.error(err);
      DisplaySonner(t("An error occurred while updating the member.")); // Show error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/40">
      <Link
        to="/Admin"
        className="border-b-2 border-blue-500 text-blue-500 hover:border-blue-700 hover:text-blue-700 mb-7 block"
      >
        {t("Go Back")}
      </Link>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{t("Edit Member")}</CardTitle>
          <CardDescription>
            {t("Fill out the form to edit the member details.")}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="image">{t("Profile Image")}</Label>
            <div className="flex items-center gap-2">
              <Input
                id="image"
                type="file"
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
              />
              <Button variant="outline" size="icon">
                <UploadIcon className="h-4 w-4" />
                <span className="sr-only">{t("Upload image")}</span>
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="moreImages">{t("More Images")}</Label>
            <div className="flex items-center gap-2">
              <Input
                id="moreImages"
                type="file"
                multiple
                onChange={(e) =>
                  setMoreImages(
                    e.target.files ? Array.from(e.target.files) : null
                  )
                }
              />
              <Button variant="outline" size="icon">
                <UploadIcon className="h-4 w-4" />
                <span className="sr-only">{t("Upload images")}</span>
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">{t("Name")}</Label>
            <Input
              id="name"
              placeholder={t("Enter the member name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">{t("Description")}</Label>
            <Textarea
              id="description"
              placeholder={t("Enter the member description")}
              className="min-h-[150px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">{t("Role")}</Label>
            <Textarea
              id="role"
              placeholder={t("Enter the member role")}
              className="min-h-[150px]"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" onClick={handleSubmit} disabled={loading}>
            {loading ? t("Submitting...") : t("Submit")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

function UploadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

export default EditMember;
