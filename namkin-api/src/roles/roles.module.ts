import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [PrismaModule, CaslModule],
  exports: [RolesService],
})
export class RolesModule {}
