"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import PreferenceService from "@/services/PreferenceService";
import { useAuth } from "@/context/AuthContext";

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default function UpdateAvatarDialog({ open, onOpenChange }) {
  const { user, setUser } = useAuth();
  const [preview, setPreview] = useState(user?.avatar || null);
  const [fileData, setFileData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png"];
    const maxSize = 1 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      toast.error("Only JPG and PNG files are allowed");
      return;
    }

    if (file.size > maxSize) {
      toast.error("File size must be under 1MB");
      return;
    }

    const base64 = await convertToBase64(file);
    setPreview(base64);
    setFileData(base64);
  };

  const handleSave = async () => {
    if (!fileData) return;

    setIsSubmitting(true);
    try {
      const freshUser = await PreferenceService.getCurrentUser();

      const payload = {
        avatar: fileData,
        bio: freshUser.bio || "",
        skills: freshUser.skills || [],
        learn: freshUser.learn || [],
      };

      console.log("🚀 Payload gửi lên:", payload);
      await PreferenceService.postUserPreference(payload);

      const updated = await PreferenceService.getCurrentUser();
      console.log("🧠 Updated user:", updated);

      setUser(updated);
      setPreview(updated.avatar);
      toast.success("Avatar updated!");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to update avatar");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border">
            <img
              src={preview || user?.avatar || "https://placehold.co/300x300"}
              alt="Preview"
              className="object-cover w-full h-full"
            />
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm"
          />

          <div className="flex justify-end w-full gap-2 pt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSave} disabled={isSubmitting || !fileData}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
