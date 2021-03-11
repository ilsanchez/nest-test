import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name)
  
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const entity = new User();
    entity.username = createUserDto.username
    entity.email = createUserDto.email
    entity.password = createUserDto.password
    const user = this.usersRepository.create(entity)
    return await this.usersRepository.insert(user)
  }

  find(user: Partial<User>) {
    return this.usersRepository.find({
      where: [{ username: user.username }, { email: user.email }],
    });
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(username: string) {
    return this.usersRepository.findOne({ username });
  }

  update(username: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update({ username }, updateUserDto);
  }

  async remove(username: string) {
    const user = await this.usersRepository.findOne({ username });
    if (user) {
      return this.usersRepository.remove([user]);
    }
    throw new NotFoundException();
  }
}
