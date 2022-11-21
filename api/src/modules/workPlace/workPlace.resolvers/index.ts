import { fetchWorkPlacesResolver } from '@/modules/workPlace/workPlace.resolvers/fetchWorkPlaces.resolver';
import { createWorkPlaceResolver } from '@/modules/workPlace/workPlace.resolvers/createWorkPlace.resolver';
import { updateWorkPlaceResolver } from '@/modules/workPlace/workPlace.resolvers/updateWorkPlace.resolver';
import { deleteWorkPlaceResolver } from '@/modules/workPlace/workPlace.resolvers/deleteWorkPlace.resolver';

export const WorkPlaceResolvers = {
  Mutation: {
    fetchWorkPlaces: fetchWorkPlacesResolver,
    createWorkPlace: createWorkPlaceResolver,
    updateWorkPlace: updateWorkPlaceResolver,
    deleteWorkPlace: deleteWorkPlaceResolver,
  },
};
