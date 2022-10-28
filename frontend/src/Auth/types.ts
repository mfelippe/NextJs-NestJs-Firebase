import { User } from "../types/User";

export type AuthContextType = {
  user: User | null;
  signin: () => void;
  sigout: () => void;
};
