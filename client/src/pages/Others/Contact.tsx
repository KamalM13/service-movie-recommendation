import { t } from "i18next";
import Contact from "../../components/Contact/Contact";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { CName, CPhone, CEmail, CFacebook, CInstagram, CLinkedin, CNumbers, CBranches } from "../../utils/utils";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function ContactUs() {
  return (
    <section className="w-full py-3 md:py-6 lg:py-12 flex justify-center">
      <div className="container grid items-start justify-between gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
        <Contact />
        <div className="space-y-6 flex justify-center">
          <div className="space-y-4">
            <h2 className=" text-3xl font-bold tracking-tighter sm:text-4xl">
              {t("Contact Us")}
            </h2>

            <div className="flex items-start gap-4">
              <Phone className="mt-1 h-6 w-6 text-gray-600" />
              <div>
                <p className="font-medium ">{t("Phone")}</p>
                <a className="text-gray-600 dark:text-gray-200" href={`tell:${CPhone}`}>
                  {CNumbers.map((number, index) => (
                    <p key={index} className="my-1">{number}</p>
                  ))}

                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="mt-1 h-6 w-6 text-gray-600 " />
              <div>
                <p className="font-medium ">{t("Email")}</p>
                <a className="text-gray-600 dark:text-gray-200" href={`mailto:${CEmail}`}>
                  {CEmail}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-6 w-6 text-gray-600" />
              <div>
                <p className="font-medium ">{t(CName)}</p>
                {CBranches.map((branch, index) => (
                  <p key={index} className="my-1">{branch}</p>
                ))}
                
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex gap-2">
              <a
              href={CFacebook}
              className="text-gray-600 dark:text-gray-200 hover:text-primary"
              target="_blank"
            >
              <FaFacebook className="h-6 w-6" />
            </a>
                <a href={CInstagram} className="text-gray-600 dark:text-gray-200 hover:text-primary">
                  <FaInstagram className="h-6 w-6" />
                </a>
                <a href={CLinkedin} className="text-gray-600 dark:text-gray-200 hover:text-primary">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

