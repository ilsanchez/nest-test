import { PickType } from '@nestjs/mapped-types';
import { User } from 'src/users/entities/user.entity';

export class LoginDto extends PickType(User, ['password', 'username']) {}
