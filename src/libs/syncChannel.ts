const normalizePath = (pathname: string) => {
  if (pathname.startsWith("/user/")) return "/user/[id]";
  return pathname;
};

const CHANNEL_NAME = `clicknote-comments-${normalizePath(
  window.location.pathname
)}`;
export const commentChannel = new BroadcastChannel(CHANNEL_NAME);
