import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductsController } from './products.controller';
import { CaslModule } from 'src/casl/casl.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [ProductsService],
  imports: [PrismaModule, CaslModule, UsersModule],
  exports: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
