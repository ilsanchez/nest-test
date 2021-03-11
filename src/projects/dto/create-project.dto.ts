import { PickType } from '@nestjs/mapped-types';
import { Project } from '../entities/project.entity';

export class CreateProjectDto extends PickType(Project, ['name', 'type', 'manager']) {}
