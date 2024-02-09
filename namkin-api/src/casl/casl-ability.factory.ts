import {
  MongoAbility,
  InferSubjects,
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
export enum Action {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

class User {
  id: string;
  name: string;
  email: string;
  roleIds: string[];
}

class Role {
  id: string;
  name: string;
  permissions: Permission[];
}

class Permission {
  id: string;
  name: string;
  roles: Role[];
}

class Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const subjects = {
  USER: User,
  ROLE: Role,
  PERMISSION: Permission,
  PRODUCT: Product,
  ALL: 'all',
};

type Subjects =
  | InferSubjects<
      typeof User | typeof Permission | typeof Role | typeof Product
    >
  | 'all';

export type AbilityType = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}
  async createForUser(userEmail: string) {
    const currentUser = await this.usersService.getUserByEmail(userEmail);
    const { can, build } = new AbilityBuilder<AbilityType>(createMongoAbility);

    const permissions = await this.prisma.permission.findMany({
      where: {
        roles: {
          some: {
            id: {
              in: currentUser.roleIds,
            },
          },
        },
      },
    });
    permissions.forEach((permission) => {
      const [action, subject] = permission.name.split('_');
      can(Action[action], subjects[subject]);
    });

    return build({
      detectSubjectType: (item) =>
        item.constructor as unknown as ExtractSubjectType<Subjects>,
    });
  }
}
