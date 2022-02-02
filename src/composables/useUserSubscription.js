import { store } from "../store";
import { filterUserData, getUser, supabase } from "../supabase";

const useUserSubscription = () => {
  store.user = filterUserData(getUser());

  supabase.auth.onAuthStateChange((_, session) => {
    store.user = filterUserData(session?.user);
  });
}

export default useUserSubscription;
