import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersController } from './users.controller';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [PrismaModule, forwardRef(() => CaslModule)],
  controllers: [UsersController],
})
export class UsersModule {}
