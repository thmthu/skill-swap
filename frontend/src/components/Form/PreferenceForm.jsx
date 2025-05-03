import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useState, useEffect, memo, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import ActiveButton from '@/components/Button/ActiveButton';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';
import PreferenceService from '@/services/PreferenceService';

const MAX_SKILLS = 6;

const formSchema = z.object({
  department: z.string().min(1, { message: 'Department is required' }),
  masteredSkills: z.array(z.string())
    .min(1, { message: 'Please list at least one skill' })
    .max(MAX_SKILLS+1, { message: `You can select up to ${MAX_SKILLS} skills` }),
  skillsToLearn: z.array(z.string())
    .min(1, { message: 'Please list at least one skill' })
    .max(MAX_SKILLS+1, { message: `You can select up to ${MAX_SKILLS} skills` }),
});

const UserPreferencesForm = memo(function UserPreferencesFormBase() {
  const navigate = useNavigate();
  const { refreshUserData } = useAuth();
  const [allSkills, setSkills] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [openMastered, setOpenMastered] = useState(false);
  const [openToLearn, setOpenToLearn] = useState(false);
  useEffect(() => {
    const fetchSkillsDepartment = async () => {
      const { data } = await PreferenceService.getSkillsDepartment();

      setSkills(data["SKILLS"])
      setDepartments(data["DEPARTMENTS"])
    }
    fetchSkillsDepartment()
  }, [])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      department: '',
      masteredSkills: [],
      skillsToLearn: [],
    },
  });

  const onSubmit = useCallback(async (values) => {
    try {
      await PreferenceService.postUserPreference({
        bio: values.department,
        skills: values.masteredSkills,
        learn: values.skillsToLearn,
      });
      
      refreshUserData().then(() => {
        console.log("User data refreshed successfully after preference update");
      });
      
      toast.success('Preferences saved successfully!\nWelcome to the community!',
        {
          position: 'top-center',
          duration: 3000
        }
      );
      
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    } catch (error) {
      console.error('Submission error', error);
      toast.error(error.message || 'Failed to save preferences. Please try again.');
    }
  }, [refreshUserData, navigate]);

  const handleSkillSelect = (field, skill) => {
    const currentValues = field.value;
    
    if (currentValues.includes(skill)) {
      field.onChange(currentValues.filter(s => s !== skill));
      return;
    }
    
    if (currentValues.length >= MAX_SKILLS) {
      toast.error(`You can select up to ${MAX_SKILLS} skills only`, {
        position: 'top-center',
        duration: 2000,
        style: {
          icon: '❗',
        }
      });
      return;
    }
    
    field.onChange([...currentValues, skill]);
  };

  const getInputHeight = (values) => {
    if (!values || values.length === 0) return 'h-10';
    if (values.length <= 2) return 'h-10';
    if (values.length <= 4) return 'min-h-[50px]';
    return 'min-h-[70px]';
  };
  return (
    <div>
      <Form {...form}>
        <form 
          onSubmit={(e) => {
            e.preventDefault(); 
            form.handleSubmit(onSubmit)(e);
          }} 
          className="space-y-6"
        >
          <div className="space-y-4">
            {/* Department Dropdown */}
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-text-dark font-body">Your Department *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <button
                          role="combobox"
                          aria-expanded={open}
                          className="flex h-10 w-full items-center justify-between rounded-md border border-gray-600 bg-bg-dark px-3 py-2 text-sm text-text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {field.value || "Select department..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0 bg-bg-dark border-gray-600">
                      <Command>
                        <CommandInput placeholder="Search departments..." />
                        <CommandEmpty>No department found.</CommandEmpty>
                        <CommandGroup className="max-h-60 overflow-y-auto">
                          {departments.map((dept) => (
                            <CommandItem
                              key={dept}
                              value={dept}
                              onSelect={() => {
                                field.onChange(dept);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === dept ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {dept}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-primary-medium" />
                </FormItem>
              )}
            />

            {/* Mastered Skills Multi-Select */}
            <FormField
              control={form.control}
              name="masteredSkills"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-text-dark font-body">
                    Your Mastered Skills * <span className="text-xs text-zinc-500">(max {MAX_SKILLS})</span>
                  </FormLabel>
                  <Popover open={openMastered} onOpenChange={setOpenMastered}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <button
                          role="combobox"
                          aria-expanded={openMastered}
                          className={`flex ${getInputHeight(field.value)} w-full items-center justify-between rounded-md border border-gray-600 bg-bg-dark px-3 py-2 text-sm text-text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                        >
                          <div className="flex flex-wrap gap-1">
                            {field.value.length > 0
                              ? field.value.map(skill => 
                                  <span key={skill} className="bg-gray-700 px-2 py-1 rounded text-xs">
                                    {allSkills.find(s => s === skill)}
                                  </span>
                                )
                              : "Select skills..."}
                          </div>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 flex-shrink-0" />
                        </button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0 bg-bg-dark border-gray-600">
                      <Command>
                        <CommandInput placeholder="Search skills..." />
                        <CommandEmpty>No skill found.</CommandEmpty>
                        <CommandGroup className="max-h-60 overflow-y-auto">
                          {allSkills.map((skill) => (
                            <CommandItem
                              key={skill}
                              value={skill}
                              onSelect={() => handleSkillSelect(field, skill)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value.includes(skill) ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {skill}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-primary-medium" />
                </FormItem>
              )}
            />

            {/* Skills to Learn Multi-Select */}
            <FormField
              control={form.control}
              name="skillsToLearn"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-text-dark font-body">
                    Skills You Want To Learn * <span className="text-xs text-zinc-500">(max {MAX_SKILLS})</span>
                  </FormLabel>
                  <Popover open={openToLearn} onOpenChange={setOpenToLearn}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <button
                          role="combobox"
                          aria-expanded={openToLearn}
                          className={`flex ${getInputHeight(field.value)} w-full items-center justify-between rounded-md border border-gray-600 bg-bg-dark px-3 py-2 text-sm text-text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                        >
                          <div className="flex flex-wrap gap-1">
                            {field.value.length > 0
                              ? field.value.map(skill => 
                                  <span key={skill} className="bg-gray-700 px-2 py-1 rounded text-xs">
                                    {allSkills.find(s => s === skill)}
                                  </span>
                                )
                              : "Select skills..."}
                          </div>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 flex-shrink-0" />
                        </button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0 bg-bg-dark border-gray-600">
                      <Command>
                        <CommandInput placeholder="Search skills..." />
                        <CommandEmpty>No skill found.</CommandEmpty>
                        <CommandGroup className="max-h-60 overflow-y-auto">
                          {allSkills.map((skill) => (
                            <CommandItem
                              key={skill}
                              value={skill}
                              onSelect={() => handleSkillSelect(field, skill)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value.includes(skill) ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {skill}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-primary-medium" />
                </FormItem>
              )}
            />

            <div className="flex justify-center flex-col gap-2">
              <ActiveButton className="text-light">Submit</ActiveButton>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
});

export default UserPreferencesForm;