import { useMutation } from "@tanstack/react-query";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getUser } from "../../axios/index";

export function useSignInWithEmailAndPassword() {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = await getUser(result.user.uid);
      return user;
    },
  });
}
