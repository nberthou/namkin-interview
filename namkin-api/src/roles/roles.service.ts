import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  getRoles() {
    return this.prisma.role.findMany();
  }

  getRole(id: string) {
    return this.prisma.role.findUnique({
      where: { id },
    });
  }

  createRole(data: { name: string }) {
    return this.prisma.role.create({
      data,
    });
  }

  editRole(id: string, params: { name: string }) {
    return this.prisma.role.update({
      where: { id },
      data: params,
    });
  }

  deleteRole(id: string) {
    return this.prisma.role.delete({
      where: { id },
    });
  }

  assignPermissionToRole(roleId: string, permissionId: string) {
    return this.prisma.role.update({
      where: { id: roleId },
      data: {
        permissions: {
          connect: {
            id: permissionId,
          },
        },
      },
    });
  }

  async getDefaultRole() {
    const role = await this.prisma.role.upsert({
      where: { name: 'READ_PRODUCT' },
      update: {},
      create: {
        name: 'READ_PRODUCT',
        permissions: {},
      },
    });

    return this.prisma.role.upsert({
      where: { name: 'User' },
      update: {},
      create: {
        name: 'User',
        permissions: {
          connect: {
            id: role.id,
          },
        },
      },
    });
  }
}
