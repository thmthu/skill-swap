import React from "react";
import ProfileCard from "@/components/Profile/ProfileCard";
import NetworkList from "@/components/Profile/NetworkList";
import LayoutContainer from "@/components/Layout/LayoutContainer";

export default function ProfilePage() {
  return (
    <LayoutContainer>
      <div className="col-span-4">
        <ProfileCard />
      </div>
      <div className="col-span-8">
        <NetworkList />
      </div>
    </LayoutContainer>
  );
}
