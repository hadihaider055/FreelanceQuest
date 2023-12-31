export const Paths = {
  default: {
    LOGIN: "/user/signin",
    SIGNUP: "/user/signup",
    METADATA: (email: string) => `/user/metadata?email=${email}`,
    FETCH_USER_CHAT: (userId: string) => `/chat/user/${userId}`,
    FETCH_CHAT_MESSAGES: (chatId: string) => `/chat/${chatId}/messages`,
    SEND_MESSAGE: "/message",
    SUBMIT_PROPOSAL: "/proposal/submit",
    UPDATE_PROFILE_PICTURE: "/user/update-profile-picture",
    GET_ALL_JOBS: (featured: boolean | null) =>
      `/job${featured ? "?featured=true" : ""}`,
    GET_USER_JOBS_FEED: (userId: string) => `/job/user/${userId}`,
    DELETE_PROFILE_PICTURE: (userId: string) =>
      `/user/profile-picture/${userId}`,
  },
};
