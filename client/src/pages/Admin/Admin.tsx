import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import PreLoader from "../../components/Main/PreLoader/PreLoader";
import { DisplaySonner } from "../../utils/utils";
import { t } from "i18next";
import { useTheme } from "../../main";
import api from "../../utils/apiClient";

interface Subscription {
  userId: string;
  username: string;
  email: string;
  phone: string;
  category: string;
  package: string;
  status: string;
}

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: string;
}

const DataTableRow = ({ rowData, actions }: any) => (
  <TableRow key={rowData.id || rowData.userId}>
    <TableCell>
      <div className="font-medium">{rowData.username}</div>
    </TableCell>
    <TableCell>{rowData.email}</TableCell>
    <TableCell>{rowData.phone || rowData.subject}</TableCell>
    <TableCell>
      <Badge variant="outline">{rowData.package || rowData.message}</Badge>
    </TableCell>
    <TableCell>{rowData.category || rowData.createdAt}</TableCell>

    <TableCell>{rowData.status}</TableCell>
    <TableCell>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoveHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {actions?.map((action: any,index:number) => (
            <DropdownMenuItem onClick={action.action} key={index}>
              {action.username}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>
);

export default function AdminPanel() {
  const auth = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const {theme} = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subscriptionsResponse, messagesResponse] = await Promise.all([
          api.get("/subscribers"),
          api.get("/messages"),
        ]);
        setSubscriptions(subscriptionsResponse.data);
        setMessages(
          messagesResponse.data.sort(
            (a: Message, b: Message) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const removeSubscription = async (userId: string, index: number) => {
    try {
      await api.delete(`/subscribers/${userId}`);
      setSubscriptions((prev) => prev.filter((_, i) => i !== index));
      DisplaySonner("Subscription removed successfully");
    } catch (err) {
      console.error(err);
    }
  };

  const updateMessage = async (messageId: string, index: number) => {
    try {
      const res = await api.put(`/messages/${messageId}`, { status: "read" });
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[index].status = "read";
        return newMessages;
      });
      DisplaySonner(res.data.message);
    } catch (err) {
      console.error(err);
    }
  };



  if (loading) return <PreLoader />;

  return (
    <>      
    <div className=" min-h-screen w-full overflow-hidden pl-0 md:pl-36">
      <div className="flex flex-col">
        <header className={`sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b ml-6 ${theme === 'light' ? "bg-background" : "bg-neutral-900"} px-6 `}>
          <h1 className="text-lg font-semibold">{t("Admin Dashboard")}</h1>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <img
                    src={
                      auth?.user?.profileImage || "/assets/Profile/Profile.jpg"
                    }
                    width="32"
                    height="32"
                    className="rounded-full"
                    alt="Avatar"
                    style={{ aspectRatio: "32/32", objectFit: "cover" }}
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t("My Account")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/settings">{t("Settings")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button onClick={() => auth.logout()}>{t("Log out")}</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("Subscription Overview")}</CardTitle>
                <CardDescription>
                  {t("Monitor and manage your active subscriptions.")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("Customer")}</TableHead>
                      <TableHead>{t("Email")}</TableHead>
                      <TableHead>{t("Phone")}</TableHead>
                      <TableHead>{t("Category")}</TableHead>
                      <TableHead>{t("Package")}</TableHead>
                      <TableHead>{t("Status")}</TableHead>
                      <TableHead>{t("Actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptions.map((subscription, index) => (
                      <DataTableRow
                        key={index}
                        rowData={{
                          ...subscription,
                          index,
                        }}
                        actions={[
                          {
                            name: t("Remove"),
                            action: () => removeSubscription,
                          },
                        ]}
                      />
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t("Messages")}</CardTitle>
                <CardDescription>
                  {t("View and respond to messages from your customers.")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("Sender Name")}</TableHead>
                      <TableHead>{t("Sender Email")}</TableHead>
                      <TableHead>{t("Subject")}</TableHead>
                      <TableHead>{t("Message")}</TableHead>
                      <TableHead>{t("Date")}</TableHead>
                      <TableHead>{t("Status")}</TableHead>
                      <TableHead>{t("Actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.map((message, index) => (
                      <DataTableRow
                        key={index}
                        rowData={{ ...message, index }}
                        actions={[
                          {
                            name: t("Mark as Read"),
                            action: () => updateMessage(message._id, index),
                          },
                        ]}
                      />
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
    </>

  );
}

function MoveHorizontalIcon(props: any) {
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
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}
