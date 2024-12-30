import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { useNavigate, useParams } from "react-router-dom";
import { DisplaySonner } from "../../../utils/utils";
import { useAuth } from "../../../context/AuthContext";
import PreLoader from "../../../components/Main/PreLoader/PreLoader";
import api from "../../../utils/apiClient";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage: string;
  role: string;
  password?: string;
  newPassword?: string;
  currentPassword?: string;
}

export default function ProfilePage() {
  const { id } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm<UserData>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/users/${id}`);
        setUserData(response.data);
        Object.entries(response.data).forEach(([key, value]) => {
          setValue(key as keyof UserData, value as string);
        });
      } catch (err) {
        DisplaySonner((err as any).response.data.message);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [id, setValue]);

  const onSubmit = async (data: UserData) => {
    setIsUpdating(true);
    try {
      const updateData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        profileImage: userData?.profileImage || "",
        role: userData?.role || "",
      };

      await api.put(`/users/${id}`, updateData);
      setUserData({ ...userData, ...updateData });

      // Clear password fields after successful update
      DisplaySonner("Profile updated successfully");
      setValue("currentPassword", "");
      setValue("password", "");
      setValue("newPassword", "");
    } catch (err) {
      DisplaySonner((err as any).response.data.message);
    }
    setIsUpdating(false);
  };

  if (isLoading) return <PreLoader />;
  if (!userData) return <div>No user data found</div>;

  const isEditable = id === auth?.user?._id;

  return (
    <Card className="w-full max-w-2xl mx-auto min-h-screen">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditable ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex justify-center mb-6">
              <Avatar className="w-32 h-32">
                <AvatarImage
                  src={userData.profileImage}
                  alt={`${userData.firstName} ${userData.lastName}`}
                />
                <AvatarFallback>
                  {userData.firstName[0]}
                  {userData.lastName[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" {...register("firstName")} />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" {...register("lastName")} />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...register("phone")} />
            </div>

            <div>
              <Label htmlFor="role">Role</Label>
              <Input id="role" readOnly value={userData.role} />
            </div>
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                {...register("currentPassword")}
                required
              />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password (Optional)</Label>
              <Input
                id="newPassword"
                type="password"
                {...register("newPassword")}
              />
            </div>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update"}
            </Button>
          </form>
        ) : (
          <div>
            <div className="flex justify-center mb-6">
              <Avatar className="w-32 h-32">
                <AvatarImage
                  src={userData.profileImage}
                  alt={`${userData.firstName} ${userData.lastName}`}
                />
                <AvatarFallback>
                  {userData.firstName[0]}
                  {userData.lastName[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>First Name:</strong> {userData.firstName}
                </p>
              </div>
              <div>
                <p>
                  <strong>Last Name:</strong> {userData.lastName}
                </p>
              </div>
            </div>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Phone:</strong> {userData.phone}
            </p>
            <p>
              <strong>Role:</strong> {userData.role}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
