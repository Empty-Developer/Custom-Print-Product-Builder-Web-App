"use client";

import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useUser } from "@stackframe/stack";
import { useMutation } from "convex/react";
import React, { ReactNode, useEffect, useCallback, useState } from "react";

function Provider({ children }: { children: ReactNode }) {
  const user = useUser();
  const createNewUserMutation = useMutation(api.users.CreateNewUser);
  const [userDetail, setUserDetail] = useState<any>(null);

  const syncUser = useCallback(async () => {
    if (user && user.primaryEmail) {
      try {
        const result = await createNewUserMutation({
          name: user.displayName ?? "Anonymous",
          email: user.primaryEmail,
          picture: user.profileImageUrl ?? "",
        });
        setUserDetail(result);
        console.log("User synced:", result);
      } catch (error) {
        console.error("Error syncing user:", error);
      }
    }
  }, [user, createNewUserMutation]);

  useEffect(() => {
    syncUser();
  }, [syncUser]);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  )
}

export default Provider;