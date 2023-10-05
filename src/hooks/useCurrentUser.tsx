import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";

import { onAuthStateChangedListener } from "@/utils/firebase/auth.firebase";
import { getUserData } from "@/utils/firebase/db.firebase";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<DocumentData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        const userData = await getUserData(user);
        setCurrentUser(userData ?? null);
      }
    });

    return unsubscribe;
  }, []);

  return currentUser;
};

export default useCurrentUser;
