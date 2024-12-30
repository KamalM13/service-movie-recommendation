import { t } from "i18next";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { TrashIcon } from "lucide-react";

export function CustomAlertDialog({
  actionText,
  title,
  description,
  cancelText = "Cancel",
  actionFunction,
  id,
  className,
  buttonClassName,
}: any) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className={className}>
        <Button variant="ghost" className={buttonClassName}>
          <span>{t(actionText)}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="dark:text-white">{t(title)}</AlertDialogTitle>
          <AlertDialogDescription>{t(description)}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:text-white">{t(cancelText)}</AlertDialogCancel>
          <AlertDialogAction onClick={() => actionFunction(id)}>
            {t(actionText)}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function TrashAlertDialog({
  actionText,
  title,
  description,
  cancelText = "Cancel",
  actionFunction,
  id,
  className,
  buttonClassName,
}: any) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className={className}>
        <Button variant="ghost" className={buttonClassName}>
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="dark:text-white">{t(title)}</AlertDialogTitle>
          <AlertDialogDescription>{t(description)}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:text-white">{t(cancelText)}</AlertDialogCancel>
          <AlertDialogAction onClick={() => actionFunction(id)}>
            {t(actionText)}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
