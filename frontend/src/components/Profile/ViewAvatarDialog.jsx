import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function ViewAvatarDialog({ avatarUrl, open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full flex justify-center">
        <div className="w-60 h-60 rounded-full overflow-hidden border border-gray-300 shadow">
          <img
            src={avatarUrl}
            alt="Profile avatar"
            className="object-cover w-full h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
