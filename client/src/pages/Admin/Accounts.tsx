import { Input } from "../../components/ui/input";
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
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { DisplaySonner } from "../../utils/utils";
import PreLoader from "../../components/Main/PreLoader/PreLoader";
import { CustomAlertDialog } from "../../components/CustomAlertDialog";
import { User } from "../../types/user";
import api from "../../utils/apiClient";

export default function Accounts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get("/users");
      setUsers(res.data);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id: string) => {
    try {
      const res = await api.post(`/deleteuser`, {
        id,
      });
      DisplaySonner(res.data.message);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const banUser = async (id: string) => {
    try {
      const res = await api.post("/banuser", {
        id,
      });
      DisplaySonner(res.data.message);
      setUsers(
        users.map((user) => {
          if (user._id === id) {
            user.suspended.status = true;
          }
          return user;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const unbanUser = async (id: string) => {
    try {
      const res = await api.post("/unbanuser", {
        id,
      });
      DisplaySonner(res.data.message);
      setUsers(
        users.map((user) => {
          if (user._id === id) {
            user.suspended.status = false;
          }
          return user;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );
  return (
    <div className="w-full">
      <header className="flex items-center justify-between bg-background px-4 py-3 shadow-sm sm:px-6">
        <div className="relative flex-1">
          <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search accounts..."
            className="w-full rounded-lg bg-background pl-8 sm:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>
      <Link
        to="/Admin"
        className="border-b-2 border-blue-500 text-blue-500 hover:border-blue-700 hover:text-blue-700 m-7"
      >
        Go Back
      </Link>
      <main className="p-4 sm:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Accounts</CardTitle>
            <CardDescription>Manage your user accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profile</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      <PreLoader withBG={false} />
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {filteredUsers.map((account, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Avatar className="h-9 w-9">
                            <AvatarImage
                              src="/placeholder-user.jpg"
                              alt={account.username}
                            />
                            <AvatarFallback>
                              {account.username.charAt(0)}
                              {account.username.charAt(1)}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">
                          {account.username}
                        </TableCell>
                        <TableCell>{account.email}</TableCell>
                        <TableCell>{account.phone}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 justify-between">
                            <CustomAlertDialog
                              actionText="Delete"
                              title="Are you sure you want to delete this account?"
                              description="This action cannot be undone. The user will be permanently deleted from the platform."
                              actionFunction={deleteUser}
                              id={account._id}
                            />
                            {account.suspended.status ? (
                              <CustomAlertDialog
                                actionText="Unban"
                                title="Are you sure you want to unban this account?"
                                description="This action cannot be undone. The user will be unbanned from the platform."
                                actionFunction={unbanUser}
                                id={account._id}
                              />
                            ) : (
                              <CustomAlertDialog
                                actionText="Ban"
                                title="Are you sure you want to ban this account?"
                                description="This action cannot be undone. The user will be permanently banned from the platform."
                                actionFunction={banUser}
                                id={account._id}
                              />
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

