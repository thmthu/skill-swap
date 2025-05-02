import React, { useState } from "react";
import {
  EnvelopeIcon,
  UsersIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

import ActiveButton from "@/components/Button/ActiveButton";
import { useAuth } from "@/context/AuthContext";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import EditSkillDialog from "@/components/Profile/EditSkillDialog";
import ViewAvatarDialog from "./ViewAvatarDialog";

export default function ProfileCard() {
  const { logout, user } = useAuth();

  const [currentSkills, setCurrentSkills] = useState(user?.skills || []);
  const [wantToLearn, setWantToLearn] = useState(user?.learn || []);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false); // ✅ NEW

  return (
    <div className="w-[400px] rounded-xl shadow-xl overflow-hidden border border-primary relative bg-white">
      {/* 🔝 Header background */}
      <div className="bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end h-32" />

      {/* 👤 Avatar with Dropdown */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer p-[4px] rounded-full bg-gradient-to-tr from-primary to-primary-medium shadow-lg">
              <img
                src={user?.avatar || "https://placehold.co/300x300"}
                alt="avatar"
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-2">
            <DropdownMenuItem onClick={() => setIsAvatarDialogOpen(true)}>
              View profile picture
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Change profile picture")}
            >
              Change profile picture
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* ✅ Avatar dialog tách riêng ngoài DropdownMenu */}
        <ViewAvatarDialog
          avatarUrl={user?.avatar || "https://placehold.co/300x300"}
          open={isAvatarDialogOpen}
          onOpenChange={setIsAvatarDialogOpen}
        />
      </div>

      {/* 📛 Name */}
      <div className="mt-24 flex flex-col items-center gap-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
          {user?.username || "Your Name"}
        </h2>
      </div>

      {/* 🔻 Body Content */}
      <div className="p-6 pt-4 flex flex-col gap-6 text-gray-800">
        {/* 📧 Email + Connections */}
        <div className="flex flex-col gap-3 text-base">
          <div className="flex items-center gap-3">
            <UsersIcon className="w-5 h-5 text-gray-600" />
            <span>{user?.connections?.length || 0} Connections</span>
          </div>
          <div className="flex items-center gap-3">
            <EnvelopeIcon className="w-5 h-5 text-gray-600" />
            <span className="truncate">{user?.email || "you@example.com"}</span>
          </div>
        </div>

        {/* 🏷️ Skill Tags */}
        <div className="flex flex-col gap-4 text-sm">
          {/* Current Skill */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">
                Current Skill:
              </span>
              <EditSkillDialog
                type="current"
                title="Edit Current Skills"
                initialSkills={currentSkills}
                onSave={(updated) => setCurrentSkills(updated)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {currentSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary text-white rounded-full font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Want to Learn */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">
                Target Skills:
              </span>
              <EditSkillDialog
                type="learn"
                title="Edit Target Skills"
                initialSkills={wantToLearn}
                onSave={(updated) => setWantToLearn(updated)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {wantToLearn.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-medium text-white rounded-full font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* 🔴 Logout Button */}
        <ActiveButton
          className="w-full flex items-center justify-center gap-2 text-red-500 font-semibold py-3 rounded-xl border border-red-500 hover:bg-red-500/10 transition-all"
          onClick={logout}
        >
          <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
          Logout
        </ActiveButton>
      </div>
    </div>
  );
}
