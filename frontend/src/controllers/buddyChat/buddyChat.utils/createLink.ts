import { Routes } from '@/controllers/router/router.constants';

export const createLink = (id: number, slug: string) => `${Routes.Chats}/${id}-${slug}`;
