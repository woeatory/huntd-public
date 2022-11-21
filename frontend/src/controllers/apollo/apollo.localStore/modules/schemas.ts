import { gql } from '@apollo/client';
import { FlashMessageSchema } from '@/controllers/apollo/apollo.localStore/modules/flashMessage/flashMessage.schema';

const ModulesSchemas = [
  FlashMessageSchema,
];

const LinkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

export const schemas = [LinkSchema, ...ModulesSchemas];
