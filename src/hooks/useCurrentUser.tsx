import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";

import { onAuthStateChangedListener } from "@/utils/firebase/auth.firebase";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<DocumentData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        setCurrentUser(user);
        console.log("USER:", user);
      } else {
        setCurrentUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return currentUser;
};

export default useCurrentUser;
