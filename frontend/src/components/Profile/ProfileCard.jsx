import React from "react";
import {
  EnvelopeIcon,
  UsersIcon,
  ArrowRightStartOnRectangleIcon,
  PencilIcon, // 🆕 Thêm icon edit
} from "@heroicons/react/24/outline";

import ActiveButton from "@/components/Button/ActiveButton";
import { useAuth } from "@/context/AuthContext";

export default function ProfileCard() {
  const { logout } = useAuth();

  return (
    <div className="w-[400px] rounded-xl shadow-xl overflow-hidden border border-primary relative bg-white">
      {/* 🔝 Header Gradient */}
      <div className="bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end h-32" />

      {/* 👤 Avatar: nằm giữa + viền gradient */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
        <div className="p-[4px] rounded-full bg-gradient-to-tr from-primary to-primary-medium shadow-lg">
          <img
            src="https://placehold.co/300x300"
            alt="avatar"
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>

      {/* 📛 Tên (gradient text) */}
      <div className="mt-24 flex flex-col items-center gap-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
          Uyen Nhi
        </h2>
      </div>

      {/* 🔻 Body content */}
      <div className="p-6 pt-4 flex flex-col gap-6 text-gray-800">
        {/* 📧 Email + Connections */}
        <div className="flex flex-col gap-3 text-base">
          <div className="flex items-center gap-3">
            <UsersIcon className="w-5 h-5 text-gray-600" />
            <span>20 Connections</span>
          </div>
          <div className="flex items-center gap-3">
            <EnvelopeIcon className="w-5 h-5 text-gray-600" />
            <span className="truncate">tonyminh2005@gmail.com</span>
          </div>
        </div>

        {/* 🏷️ Skill Tags */}
        <div className="flex flex-col gap-4 text-sm">
          {/* 🛠️ Current Skill */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">
                Current Skill:
              </span>
              <button className="text-gray-500 hover:text-primary transition">
                <PencilIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary text-white rounded-full font-medium">
                React
              </span>
              <span className="px-3 py-1 bg-primary text-white rounded-full font-medium">
                Tailwind CSS
              </span>
            </div>
          </div>

          {/* 🎯 Want to Learn */}
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-gray-700">Want to Learn:</span>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary-medium text-white rounded-full font-medium">
                Node.js
              </span>
              <span className="px-3 py-1 bg-primary-medium text-white rounded-full font-medium">
                MongoDB
              </span>
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
