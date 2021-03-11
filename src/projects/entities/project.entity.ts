import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProjectType {
  TYPE_1 = 'type1',
  TYPE_2 = 'type2',
  TYPE_3 = 'type3',
}


@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @Column({ unique: true })
  name: string;

  @Column({ default: ProjectType.TYPE_1, enum: ProjectType })
  type: ProjectType;

  @ManyToMany(() => User)
  @JoinTable({name: 'contributors_projects'})
  contributors: User[];

  @ManyToOne(() => User, user => user.managedProjects)
  manager: User;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
