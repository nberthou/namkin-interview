import {
  Controller,
  UseGuards,
  Get,
  Request,
  Post,
  Patch,
  Delete,
  Response,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  Action,
  CaslAbilityFactory,
  subjects,
} from 'src/casl/casl-ability.factory';
import { PermissionsService } from 'src/permissions/permissions.service';

@Controller()
export class PermissionsController {
  constructor(
    private permissionService: PermissionsService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('permissions')
  async getPermissions(@Request() req, @Response() res) {
    const { email } = req.user;
    const ability = await this.caslAbilityFactory.createForUser(email);
    if (ability.can(Action.READ, subjects.PERMISSION)) {
      const permissions = await this.permissionService.getPermissions();
      return res.status(200).json(permissions);
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('permission/:id')
  async getPermission(@Request() req, @Response() res) {
    const { email } = req.user;
    const ability = await this.caslAbilityFactory.createForUser(email);
    if (ability.can(Action.READ, subjects.PERMISSION)) {
      const permission = await this.permissionService.getPermission(
        req.params.id,
      );
      return res.status(200).json(permission);
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('permission')
  async createPermission(@Request() req, @Response() res) {
    const { email } = req.user;
    const ability = await this.caslAbilityFactory.createForUser(email);
    if (ability.can(Action.CREATE, subjects.PERMISSION)) {
      const permisison = await this.permissionService.createPermission(
        req.body,
      );
      return res.status(201).json(permisison);
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('permission/:id')
  async editPermission(@Request() req, @Response() res) {
    const { email } = req.user;
    const ability = await this.caslAbilityFactory.createForUser(email);
    if (ability.can(Action.UPDATE, subjects.PERMISSION)) {
      return this.permissionService.editPermission(req.params.id, req.body);
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('permission/:id')
  async deletePermission(@Request() req, @Response() res) {
    const { email } = req.user;
    const ability = await this.caslAbilityFactory.createForUser(email);
    if (ability.can(Action.DELETE, subjects.PERMISSION)) {
      const permission = await this.permissionService.deletePermission(
        req.params.id,
      );
      return res.status(200).json(permission);
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }
}
