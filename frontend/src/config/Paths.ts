export const Paths = {
  default: {
    LOGIN: "/user/signin",
    SIGNUP: "/user/signup",
    METADATA: (email: string) => `/user/metadata?email=${email}`,
  },
};
