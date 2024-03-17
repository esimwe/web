import React from "react";
import { ProfileComponent } from "@/components/profilePageComponents/ProfileComponent";
import getCurrentUser from "@/actions/getCurrentUser";
import { getAdminRewards } from "@/actions/getAdminRewards";

const Profile = async () => {
  const currentUser: any = await getCurrentUser();
  const getPercent: any = await getAdminRewards();
  return (
    <ProfileComponent currentUser={currentUser} percentage={getPercent[0]} />
  );
};

export default Profile;
