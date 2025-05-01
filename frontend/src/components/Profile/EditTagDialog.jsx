import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";

export default function EditTagDialog({
  trigger,
  type,
  defaultValues,
  onSave,
}) {
  const form = useForm({
    defaultValues: {
      tags: defaultValues.join(", "),
    },
  });

  const handleSubmit = (values) => {
    const tags = values.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    onSave(tags);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit {type === "skills" ? "Current Skills" : "Want to Learn"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (comma-separated)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. React, Tailwind" />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
