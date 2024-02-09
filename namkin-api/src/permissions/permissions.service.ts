import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  getPermissions() {
    return this.prisma.permission.findMany();
  }

  getPermission(id: string) {
    return this.prisma.permission.findUnique({
      where: { id },
    });
  }

  async createPermission(data: { name: string }) {
    return await this.prisma.permission.create({
      data,
    });
  }

  editPermission(id: string, params: { name: string }) {
    return this.prisma.permission.update({
      where: { id },
      data: params,
    });
  }

  deletePermission(id: string) {
    return this.prisma.permission.delete({
      where: { id },
    });
  }
}
