import gql from 'graphql-tag';

export const NotificationsSchema = gql`
  enum NotificationChannel {
    PUSH
  }

  extend type Mutation {
    sendNotification(
      channel: NotificationChannel!
      target: String!
      title: String!
      body: String!
      payload: String
    ): Boolean!
  }
`;
