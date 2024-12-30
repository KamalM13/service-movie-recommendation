import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import { useAuth } from "../context/AuthContext";
import { DisplaySonner } from "../utils/utils";
import { useTheme } from "../main";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import api from "../utils/apiClient";

export default function Settings() {
  const [activeSection, setActiveSection] = useState("personal-information");
  const auth = useAuth();
  const [email, setEmail] = useState(auth.user?.email);
  const [phone, setPhone] = useState(auth.user?.phone);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { toggleTheme, theme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    setPassword("");
    setNewPassword("");
  }, [activeSection]);

  const handleLanguageChange = (newLanguage: any) => {
    setLanguage(newLanguage);
  
    i18n.changeLanguage(newLanguage);
  
    window.location.reload();
  };

  const handlePISubmit = async () => {
    try{
      const res = await api.put(`/users/${auth?.user?._id}`, {
        name,
        phone,
        currentPassword: password,
        newPassword,
      });
      DisplaySonner(res.data.message);
      setPassword("");
      setNewPassword("");
      if (res.status === 200) {
        setTimeout(() => {
          auth.logout();
        }, 2000);
      }
    }
    catch(err){
      DisplaySonner((err as any).response.data.message);
    }


  };

  const handleDeleteAccount = async () => {
    try{
      const res = await api.delete("/deleteaccount");
      DisplaySonner(res.data.message);
      if (res.status === 200) {
        setTimeout(() => {
          auth.logout();
        }, 2000);
      }
    }
    catch(err){
      DisplaySonner((err as any).response.data.message);
    }

  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 md:py-16 p-4">
      <header className="mb-8">
        <h1 className=" text-3xl font-bold">{t("Settings")}</h1>
      </header>
      <nav className="mb-8">
        <ul className="flex space-x-6 text-muted-foreground">
          <li>
            <button
              onClick={() => setActiveSection("personal-information")}
              className={`hover:underline hover:underline-offset-4 ${
                activeSection === "personal-information"
                  ? " underline underline-offset-4"
                  : ""
              }`}
            >
              {t("Personal Information")}
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("account-settings")}
              className={`hover:underline hover:underline-offset-4 ${
                activeSection === "account-settings"
                  ? " underline underline-offset-4"
                  : ""
              }`}
            >
               {t("Account Settings")}
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("preferences")}
              className={`hover:underline hover:underline-offset-4 ${
                activeSection === "preferences"
                  ? " underline underline-offset-4"
                  : ""
              }`}
            >
               {t("Preferences")}
            </button>
          </li>
        </ul>
      </nav>
      <div className="space-y-12">
        {activeSection === "personal-information" && (
          <section id="personal-information">
            <div className="mb-4">
              <h2 className=" text-2xl font-bold"> {t("Personal Information")}</h2>
              <p className="text-muted-foreground">
                 {t("Update your name, phone number, password, and new password.")}
              </p>
            </div>
            <Card>
              <CardContent className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="email"> {t("Email")}</Label>
                  <Input
                    id="email"
                    placeholder="example@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone"> {t("Phone Number")}</Label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 555-5555"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password"> {t("Password")}</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-password"> {t("New Password (optional)")}</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto" onClick={handlePISubmit}>
                   {t("Save")}
                </Button>
              </CardFooter>
            </Card>
          </section>
        )}
        {activeSection === "account-settings" && (
          <section id="account-settings">
            <div className="mb-4">
              <h2 className="  text-2xl font-bold"> {t("Account Settings")}</h2>
              <p className="text-muted-foreground">
                 {t("Manage your account settings.")}
              </p>
            </div>
            <Card>
              <CardContent className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="password"> {t("Password")}</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                   {t("Delete Account")}
                </Button>
              </CardContent>
            </Card>
          </section>
        )}
        {activeSection === "preferences" && (
          <section id="preferences">
            <div className="mb-4">
              <h2 className=" text-2xl font-bold"> {t("Preferences")}</h2>
              <p className="text-muted-foreground">
                 {t("Customize your preferences.")}
              </p>
            </div>
            <Card>
              <CardContent className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="theme"> {t("Theme")}</Label>
                  <Select
                    value={theme}
                    onValueChange={(newTheme) => {
                      if (newTheme !== theme) toggleTheme();
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="language"> {t("Language")}</Label>
                  <Select
                    value={language}
                    onValueChange={(newLanguage) =>
                      handleLanguageChange(newLanguage)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </div>
    </div>
  );
}
