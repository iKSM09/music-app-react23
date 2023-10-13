import { useEffect } from "react";
import { useAtom } from "jotai";

import { onAuthStateChangedListener } from "@/utils/firebase/auth.firebase";
import { getUserData } from "@/utils/firebase/db.user.firebase";
import { userAtom } from "@/context/atoms";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useAtom(userAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        console.log("User signed in.");
        if (currentUser === null) {
          const userData = await getUserData(user);
          if (userData)
            setCurrentUser({
              uid: user.uid,
              displayName: userData.displayName,
              email: userData.email,
            });
        }
      } else {
        console.log("User signed out.");
        setCurrentUser(null);
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return currentUser;
};

export default useCurrentUser;
