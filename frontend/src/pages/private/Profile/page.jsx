import React from "react";
import ProfileCard from "@/components/Profile/ProfileCard";
import NetworkList from "@/components/Profile/NetworkList";
import LayoutContainer from "../../../components/LayoutContainer/LayoutContainer";

export default function ProfilePage() {
  return (
    <LayoutContainer className="grid grid-cols-12 h-full gap-6 px-6">
      {/* 🔒 ProfileCard cố định */}
      <div className="col-span-4 overflow-hidden">
        <ProfileCard />
      </div>

      {/* 🔽 NetworkList cuộn riêng */}
      <div className="col-span-8 overflow-y-auto pr-2">
        <NetworkList />
      </div>
    </LayoutContainer>
  );
}
