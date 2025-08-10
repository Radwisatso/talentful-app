export type UserAuth = {
  accessToken: string;
  user: {
    id: string;
    name: string;
    photoUrl?: string;
    position: string;
    email: string;
    role: "EMPLOYEE" | "ADMIN";
  };
};
