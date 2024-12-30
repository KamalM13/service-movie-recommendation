import { t } from "i18next";
import { Link } from "react-router-dom";

interface CustomLinkProps {
  text: string;
  to: string;
}

export default function CustomLink({ text, to }: CustomLinkProps) {
  return (
    <Link to={to} className="m-2 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 rounded-lg p-3">
      {t(text)}
    </Link>
  );
}
