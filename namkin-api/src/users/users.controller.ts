import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Patch,
  Delete,
  Response,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  CaslAbilityFactory,
  Action,
  subjects,
} from 'src/casl/casl-ability.factory';
import { UsersService } from 'src/users/users.service';

@Controller()
export class UsersController {
  constructor(
    private usersService: UsersService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getUsers(@Request() req, @Response() res) {
    const { email } = req.user;
    const ability = await this.caslAbilityFactory.createForUser(email);
    if (ability.can(Action.READ, subjects.USER)) {
      const users = await this.usersService.getUsers();
      return res.status(200).json(users);
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  async getUser(@Request() req, @Response() res) {
    const { email } = req.user;
    const ability = await this.caslAbilityFactory.createForUser(email);
    if (ability.can(Action.READ, subjects.USER)) {
      const user = await this.usersService.getUserById(req.params.id);
      return res.status(200).json(user);
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('user')
  async createUser(@Request() req, @Response() res) {
    const { email } = req.user;
    const ability = await this.caslAbilityFactory.createForUser(email);
    if (ability.can(Action.CREATE, subjects.USER)) {
      const user = await this.usersService.createUser(req.body);
      return res.status(201).json(user);
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('user/:id')
  async editUser(@Request() req, @Response() res) {
    const { email } = req.user;
    const ability = await this.caslAbilityFactory.createForUser(email);
    if (ability.can(Action.UPDATE, subjects.USER)) {
      const user = await this.usersService.updateUser(req.params.id, req.body);
      return res.status(200).json(user);
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('user/:id')
  async deleteUser(@Request() req, @Response() res) {
    const { email } = req.user;
    const ability = await this.caslAbilityFactory.createForUser(email);
    if (ability.can(Action.DELETE, subjects.USER)) {
      const user = await this.usersService.deleteUser(req.params.id);
      return res.status(200).json(user);
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('user/:userId/role/:roleId')
  async assignRoleToUser(@Request() req, @Response() res) {
    const { email } = req.user;
    const ability = await this.caslAbilityFactory.createForUser(email);
    if (ability.can(Action.UPDATE, subjects.USER)) {
      const user = await this.usersService.assignRoleToUser(
        req.params.userId,
        req.params.roleId,
      );
      return res.status(200).json(user);
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('currentUser')
  async getCurrentUser(@Request() req, @Response() res) {
    if (req.user) {
      const currentUser = await this.usersService.getUserByEmail(
        req.user.email,
      );
      return res.status(200).json(currentUser);
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }
}
