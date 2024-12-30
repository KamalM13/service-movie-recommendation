import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { t } from "i18next";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import api from "../../utils/apiClient";

export default function Footer() {
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await api.get("/getsocial");
        const social = res.data[0];
        setEmail(social?.email);
        setPhoneNumbers(social?.phoneNumbers);
        setFacebook(social?.facebook || "");
        setTwitter(social?.twitter || "");
        setLinkedin(social?.linkedin || "");
        setInstagram(social?.instagram || "");
      } catch (error) {
        console.log(error);
      }
    };
    fetchContact();
  }, []);

  return (
    <footer className="p-6 md:py-12 w-full flex justify-center border-t-2  border-neutral-800">
      <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
        <div className="flex flex-col items-start">
          <h3 className="font-semibold">{t("Company")}</h3>
          <a href="#about">{t("About Us")}</a>
          <a href="#contact">{t("Contact Us")}</a>
          <a href="#team">{t("Our Team")}</a>
          <a href="#services">{t("Our Services")}</a>
          <a href="#certificates">{t("Certificates")}</a>
          <a href="#suppliers">{t("Suppliers")}</a>
          <a href="#pricing">{t("Pricing")}</a>
        </div>

        <div className="flex flex-col items-start">
          <h3 className="font-semibold">{t("Legal")}</h3>
          <Link to="/privacy-policy">{t("Privacy Policy")}</Link>
          <Link to="/terms-service">{t("Terms of Service")}</Link>
        </div>

        <div className="flex flex-col items-start">
          <h3 className="font-semibold">{t("Contact")}</h3>
          <a href={`mailto:${email}`}>{email}</a>
          {phoneNumbers &&
            phoneNumbers.map((phone: string, index: number) => (
              <a key={index} href={`tel:${phone}`}>
                {phone}
              </a>
            ))}
        </div>

        <div className="col-span-2 md:col-span-1 flex flex-col space-y-4">
          <h3 className="font-semibold">{t("Social Media")}</h3>
          <div className="flex space-x-4">
            {facebook && (
              <a href={facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebook className="w-6 h-6 hover:text-blue-500" />
              </a>
            )}
            {twitter && (
              <a href={twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter className="w-6 h-6 hover:text-blue-400" />
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="w-6 h-6 hover:text-blue-700" />
              </a>
            )}
            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram className="w-6 h-6 hover:text-pink-500" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
