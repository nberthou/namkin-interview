import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  getProducts() {
    return this.prisma.product.findMany();
  }

  getProduct(where: { id: string }) {
    return this.prisma.product.findUnique({
      where,
    });
  }

  createProduct(data: { name: string; price: number; description: string }) {
    return this.prisma.product.create({
      data,
    });
  }

  editProduct(
    id: string,
    params: { name: string; price: number; description: string },
  ) {
    return this.prisma.product.update({
      where: { id },
      data: params,
    });
  }

  deleteProduct(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
