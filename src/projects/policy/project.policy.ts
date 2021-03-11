import { AppAbility } from 'src/casl/casl-ability.factory';
import { IPolicyHandler } from 'src/casl/policy-handler.model';
import { Action } from 'src/constants';
import { Project } from '../entities/project.entity';

export class CreateProjectPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, Project);
  }
}
