import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { ActiveButton } from "@/components/Button/ActiveButton";
import { toast } from "react-hot-toast";
import PreferenceService from "@/services/PreferenceService";
import { authService } from "@/services/AuthService";
import { useAuth } from "@/context/AuthContext";

const MAX_SIZE = 1 * 1024 * 1024; // 1MB
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default function EditAvatarDialog({ trigger }) {
  const { login } = useAuth();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [base64, setBase64] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Only JPG/PNG allowed");
      return;
    }

    if (file.size > MAX_SIZE) {
      toast.error("File too large (max 1MB)");
      return;
    }

    try {
      const base64 = await convertToBase64(file);
      setBase64(base64);
      setPreview(URL.createObjectURL(file));
    } catch (err) {
      toast.error("Failed to convert image");
    }
  };

  const handleSave = async () => {
    try {
      const freshUser = await authService.getCurrentUser();
      await PreferenceService.postUserPreference({
        bio: freshUser.bio || "",
        skills: freshUser.skills || [],
        learn: freshUser.learn || [],
        avatar: base64,
      });
      await login(await authService.getCurrentUser());
      toast.success("Avatar updated!");
    } catch (err) {
      toast.error("Failed to save avatar");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 text-black dark:text-white">
        <DialogHeader>
          <DialogTitle>Change Profile Picture</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark dark:file:bg-primary dark:hover:file:bg-primary-dark"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="max-h-60 object-contain rounded-lg border dark:border-gray-600"
            />
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <DialogClose asChild>
            <button className="px-4 py-2 text-sm border rounded text-black dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800">
              Cancel
            </button>
          </DialogClose>
          <DialogClose asChild>
            <ActiveButton onClick={handleSave}>Save</ActiveButton>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
