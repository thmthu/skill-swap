import React from "react";
import ProfileCard from "@/components/Profile/ProfileCard";
import NetworkList from "@/components/Profile/NetworkList";
import LayoutContainer from "../../../components/LayoutContainer/LayoutContainer";

export default function ProfilePage() {
  return (
    <div className="overflow-y-auto min-h-screen">
      <LayoutContainer className="grid grid-cols-12 gap-6 px-6 py-10">
        <div className="col-span-4">
          <ProfileCard />
        </div>
        <div className="col-span-8">
          <NetworkList />
        </div>
      </LayoutContainer>
    </div>
  );
}
