import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function ViewAvatarDialog({ avatarUrl, open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white flex justify-center items-center p-4 max-w-md">
        <img
          src={avatarUrl}
          alt="Profile avatar"
          className="rounded-lg object-contain max-w-full max-h-[70vh]"
        />
      </DialogContent>
    </Dialog>
  );
}
