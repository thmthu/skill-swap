import React, { useRef } from "react";
import ProfileCard from "@/components/Profile/ProfileCard";
import NetworkList from "@/components/Profile/NetworkList";
import LayoutContainer from "../../../components/LayoutContainer/LayoutContainer";

export default function ProfilePage() {
  const profileRef = useRef(); // ✅ Tạo ref cho ProfileCard

  return (
    <div className="overflow-y-auto min-h-screen">
      <LayoutContainer className="grid grid-cols-12 gap-6 px-6 py-10">
        <div className="col-span-4">
          <ProfileCard ref={profileRef} />
        </div>
        <div className="col-span-8">
          <NetworkList
            onConnectionDeleted={
              () => profileRef.current?.refreshConnectionCount() // ✅ Gọi cập nhật số connections
            }
          />
        </div>
      </LayoutContainer>
    </div>
  );
}
