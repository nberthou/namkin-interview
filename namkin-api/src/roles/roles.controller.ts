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
import { RolesService } from 'src/roles/roles.service';

@Controller()
export class RolesController {
  constructor(
    private rolesService: RolesService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('roles')
  async getRoles(@Request() req, @Response() res) {
    const { email } = req.user;
    const ability = await this.caslAbilityFactory.createForUser(email);
    if (ability.can(Action.READ, subjects.ROLE)) {
      const roles = await this.rolesService.getRoles();
      return res.status(200).json(roles);
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('role/:id')
  async getRole(@Request() req, @Response() res) {
    const { email } = req.user;
    const ability = await this.caslAbilityFactory.createForUser(email);
    if (ability.can(Action.READ, subjects.ROLE)) {
      const role = await this.rolesService.getRole(req.params.id);
      return res.status(200).json(role);
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('role')
  async createRole(@Request() req, @Response() res) {
    const { email } = req.user;
    const ability = await this.caslAbilityFactory.createForUser(email);
    if (ability.can(Action.CREATE, subjects.ROLE)) {
      const role = await this.rolesService.createRole(req.body);
      return res.status(201).json(role);
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('role/:id')
  async editRole(@Request() req, @Response() res) {
    const { email } = req.user;
    const ability = await this.caslAbilityFactory.createForUser(email);
    if (ability.can(Action.UPDATE, subjects.ROLE)) {
      const role = await this.rolesService.editRole(req.params.id, req.body);
      return res.status(200).json(role);
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('role/:id')
  async deleteRole(@Request() req, @Response() res) {
    const { email } = req.user;
    const ability = await this.caslAbilityFactory.createForUser(email);
    if (ability.can(Action.DELETE, subjects.ROLE)) {
      const role = this.rolesService.deleteRole(req.params.id);
      return res.status(200).json(role);
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('role/:roleId/permission/:permissionId')
  async assignPermissionToRole(@Request() req, @Response() res) {
    const { email } = req.user;
    const ability = await this.caslAbilityFactory.createForUser(email);
    if (ability.can(Action.UPDATE, subjects.ROLE)) {
      const role = await this.rolesService.assignPermissionToRole(
        req.params.roleId,
        req.params.permissionId,
      );
      return res.status(200).json(role);
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }
}
