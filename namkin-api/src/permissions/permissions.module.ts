import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  providers: [PermissionsService],
  controllers: [PermissionsController],
  imports: [PrismaModule, CaslModule],
  exports: [PermissionsService],
})
export class PermissionsModule {}
