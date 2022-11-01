import { User } from "../types/User";

export type AuthContextType = {
  user: User | null;
  signin: (user: User, token: string) => void;
  sigout: () => void;
};
