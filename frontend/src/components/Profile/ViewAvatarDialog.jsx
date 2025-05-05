import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function ViewAvatarDialog({ avatarUrl, open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-bg-dark p-6 rounded-xl shadow-xl max-w-sm w-full flex justify-center">
        <div className="w-60 h-60 rounded-full overflow-hidden border border-gray-300 dark:border-zinc-600 shadow">
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
