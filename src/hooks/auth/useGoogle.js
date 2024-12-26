import { useMutation } from "@tanstack/react-query";
import { auth } from "../../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { saveNewUser, getUser } from "../../axios/index";

export function useSignInWithGoogle() {
  return useMutation({
    mutationFn: async () => {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result._tokenResponse?.isNewUser) {
        await saveNewUser(
          result.user.uid,
          result.user.displayName,
          result.user.email
        );
      }
      const user = await getUser(result.user.uid);
      return user;
    },
  });
}
