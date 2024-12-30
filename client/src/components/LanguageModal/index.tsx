import { Dialog, DialogContent, DialogTitle } from "../../components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import i18n from "../../i18n";
export default function LanguageModal() {
  const [open, setOpen] = useState(true);
  const {  setLanguage } = useLanguage();

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setLanguage(langCode);
    window.location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="sm:max-w-[425px]">
      <div className="flex items-center justify-between">
        <DialogTitle>Select Language</DialogTitle>
      </div>

      <div>
        <Select onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ar">العربية</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </DialogContent>
    </Dialog>
  );
}

