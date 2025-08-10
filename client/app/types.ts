export type UserAuth = {
  accessToken: string;
  user: {
    id: string;
    name: string;
    photoUrl?: string;
    position: string;
    phoneNumber?: string;
    email: string;
    role: "EMPLOYEE" | "ADMIN";
  };
};
