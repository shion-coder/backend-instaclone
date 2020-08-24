export type FollowNotification = {
  notificationType: string;
  sender: {
    id: string;
    username: string;
    avatar: string;
  };
  receiver: string;
  date: string;
};
