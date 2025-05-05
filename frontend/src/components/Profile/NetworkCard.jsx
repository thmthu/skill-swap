import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { API_CONFIG } from "../../lib/config";

export default function NetworkCard({
  avatarUrl,
  name,
  description,
  userId,
  onDeleted,
}) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const endpoint = `${API_CONFIG.BASE_URL_SOCKET}/api/connections/delete/user/${userId}`;
      const response = await axios.delete(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            document.cookie
              .split("; ")
              .find((row) => row.startsWith("accessToken="))
              ?.split("=")[1]
          }`,
        },
      });

      if (response.status === 200) {
        console.log("Connection deleted successfully");
        onDeleted?.(userId);
        setOpen(false);
      } else {
        console.error("Error deleting connection");
      }
    } catch (error) {
      console.error(
        "Error deleting connection:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-900 border border-primary dark:border-gray-700 text-gray-800 dark:text-white shadow-sm transition hover:shadow-md hover:border-primary-dark dark:hover:border-primary">
      <CardHeader className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div
            className="w-20 h-20 rounded-xl bg-gray-300 dark:bg-gray-700"
            style={{
              backgroundImage: `url(${avatarUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="flex flex-col gap-1">
            <CardTitle className="text-lg font-semibold">{name}</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              {description}
            </CardDescription>
          </div>
        </div>

        <CardAction>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">Remove</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
              <DialogHeader>
                <DialogTitle>Remove Connection</DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-300">
                  Are you sure you want to remove{" "}
                  <span className="font-medium">{name}</span> from your network?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex gap-4 justify-end mt-4">
                <Button
                  variant="outline"
                  className="dark:bg-transparent dark:text-white dark:border-gray-600"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
