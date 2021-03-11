import { Matches } from 'class-validator';
import { Expose } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { OmitType } from '@nestjs/mapped-types';

export class RegisterDto extends OmitType(User, [
  'id',
  'managedProjects',
  'contributedProjects',
  'createdDate',
  'updatedDate',
  'roles',
]) {
  @Expose()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message: 'Password must have uppercase, lowecase, numbers and symbols. ',
  })
  password: string;
}
