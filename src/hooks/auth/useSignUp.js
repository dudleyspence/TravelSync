import { useMutation } from "@tanstack/react-query";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { saveNewUser, getUser } from "../../axios/index";

export function useCreateUserWithEmailAndPassword() {
  return useMutation({
    mutationFn: async ({ name, email, password }) => {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await saveNewUser(result.user.uid, name, email);
      const user = await getUser(result.user.uid);
      return user;
    },
  });
}
