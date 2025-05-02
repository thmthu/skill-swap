import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";

import { ChatBubbleLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function NetworkCard({ avatarUrl, name, description }) {
  return (
    <Card className="border border-primary bg-white text-gray-800 hover:shadow-md transition">
      {/* ✅ Force dùng flex layout cho header */}
      <CardHeader className="!flex items-center justify-between gap-6 w-full">
        {/* 👤 Avatar + Info */}
        <div className="flex items-center gap-5 flex-1">
          <div
            className="w-20 h-20 rounded-xl bg-gray-300 flex-shrink-0"
            style={{
              backgroundImage: `url(${avatarUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="flex flex-col gap-1">
            <CardTitle className="text-lg font-semibold">{name}</CardTitle>
            <CardDescription className="text-gray-600">
              {description}
            </CardDescription>
          </div>
        </div>

        {/* 🔘 Action Buttons */}
        <CardAction className="flex-shrink-0 flex gap-2">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 transition"
            onClick={() => console.log("Chat with", name)}
          >
            <ChatBubbleLeftIcon className="w-5 h-5 text-blue-600" />
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 transition"
            onClick={() => console.log("Remove", name)}
          >
            <XMarkIcon className="w-5 h-5 text-red-600" />
          </button>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
