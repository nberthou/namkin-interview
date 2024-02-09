import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { roles: { include: { permissions: true } } },
    });
  }

  getUserById(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: { roles: { include: { permissions: true } } },
    });
  }

  async createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: { ...data, password: await bcrypt.hash(data.password, 10) },
      include: { roles: { include: { permissions: true } } },
    });
  }

  getUsers() {
    return this.prisma.user.findMany({
      include: { roles: { include: { permissions: true } } },
    });
  }

  deleteUser(userId: string) {
    return this.prisma.user.delete({
      where: { id: userId },
      include: { roles: { include: { permissions: true } } },
    });
  }

  updateUser(userId: string, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id: userId },
      data,
      include: { roles: { include: { permissions: true } } },
    });
  }

  assignRoleToUser(userId: string, roleId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      include: { roles: { include: { permissions: true } } },
      data: {
        roles: {
          connect: {
            id: roleId,
          },
        },
      },
    });
  }

  removeRoleFromUser(userId: string, roleId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      include: { roles: { include: { permissions: true } } },
      data: {
        roles: {
          disconnect: {
            id: roleId,
          },
        },
      },
    });
  }
}
