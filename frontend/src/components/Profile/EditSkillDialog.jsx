import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { PencilIcon } from "@heroicons/react/24/outline";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandInput,
} from "@/components/ui/command";
import { toast } from "react-hot-toast";
import PreferenceService from "@/services/PreferenceService";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/AuthService";

const MAX_SKILLS = 6;

export default function EditSkillDialog({
  title,
  type,
  initialSkills = [],
  onSave,
}) {
  const { user, login } = useAuth();
  const [skills, setSkills] = useState(initialSkills);
  const [allSkills, setAllSkills] = useState([]);

  const form = useForm({
    defaultValues: {
      selectedSkill: "",
    },
  });

  const { control, handleSubmit, reset } = form;

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await PreferenceService.getSkillsDepartment();
        setAllSkills(data["SKILLS"] || []);
      } catch (error) {
        toast.error("Failed to fetch skills list");
      }
    };
    fetchSkills();
  }, []);

  const addSkill = (skill) => {
    if (!skills.includes(skill)) {
      if (skills.length >= MAX_SKILLS) {
        toast.error(`You can only add up to ${MAX_SKILLS} skills`);
        return;
      }
      setSkills([...skills, skill]);
    }
  };

  const removeSkill = (skillToRemove) => {
    const updated = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updated);
  };

  const handleSave = async () => {
    try {
      const payload = {
        bio: user?.bio || "",
        skills: type === "current" ? skills : user?.skills || [],
        learn: type === "learn" ? skills : user?.learn || [],
      };

      await PreferenceService.postUserPreference(payload);
      const freshUser = await authService.getCurrentUser();
      await login({ user: freshUser });

      toast.success("Skills updated successfully!");
      onSave(skills);
    } catch (error) {
      console.error("Error saving skills:", error);
      toast.error("Failed to save skills");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-gray-500 hover:text-primary transition">
          <PencilIcon className="w-4 h-4" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 text-black dark:text-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-primary text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-white/70 hover:text-white"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>

            <FormField
              name="selectedSkill"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Skill</FormLabel>
                  <FormControl>
                    <Command className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md max-h-[200px] overflow-y-auto">
                      <CommandInput
                        placeholder="Search skill..."
                        className="bg-white dark:bg-gray-800 text-black dark:text-white"
                      />
                      <CommandGroup>
                        {allSkills.map((skill) => (
                          <CommandItem
                            key={skill}
                            value={skill}
                            onSelect={() => {
                              addSkill(skill);
                              reset({ selectedSkill: "" });
                            }}
                            className="dark:text-white"
                          >
                            {skill}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-2">
              <DialogClose asChild>
                <button
                  type="button"
                  className="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
              </DialogClose>
              <DialogClose asChild>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm rounded-md bg-primary text-white hover:bg-primary-dark"
                >
                  Save
                </button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
