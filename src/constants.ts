import { SetMetadata } from '@nestjs/common';

export const Jwt = {
  secret: 'jwt-secret',
  expiresIn: '60m'
}

export const IS_PUBLIC_KEY = 'isPublic';
export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete'
}