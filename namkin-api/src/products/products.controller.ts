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
  Action,
  CaslAbilityFactory,
  subjects,
} from 'src/casl/casl-ability.factory';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';

@Controller()
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private usersService: UsersService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('products')
  async getProducts(@Request() req, @Response() res) {
    const { email } = req.user;
    const ability = await this.caslAbilityFactory.createForUser(email);
    if (ability.can(Action.READ, subjects.PRODUCT)) {
      const products = await this.productsService.getProducts();
      return res.status(200).json(products);
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('product/:id')
  async getProduct(@Request() req, @Response() res) {
    const { email } = req.user;
    const ability = await this.caslAbilityFactory.createForUser(email);
    if (ability.can(Action.READ, subjects.PRODUCT)) {
      const product = await this.productsService.getProduct({
        id: req.params.id,
      });
      return res.status(200).json(product);
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('product')
  async createProduct(@Request() req, @Response() res) {
    const { email } = req.user;
    const ability = await this.caslAbilityFactory.createForUser(email);
    if (ability.can(Action.CREATE, subjects.PRODUCT)) {
      const product = await this.productsService.createProduct(req.body);
      return res.status(201).json(product);
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('product/:id')
  async editProduct(@Request() req, @Response() res) {
    const { email } = req.user;
    const ability = await this.caslAbilityFactory.createForUser(email);
    if (ability.can(Action.UPDATE, subjects.PRODUCT)) {
      const product = await this.productsService.editProduct(
        req.params.id,
        req.body,
      );
      return res.status(200).json(product);
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('product/:id')
  async deleteProduct(@Request() req, @Response() res) {
    const { email } = req.user;
    const ability = await this.caslAbilityFactory.createForUser(email);
    if (ability.can(Action.DELETE, subjects.PRODUCT)) {
      const product = await this.productsService.deleteProduct(req.params.id);
      return res.status(200).json(product);
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
    return this.productsService.deleteProduct(req.params.id);
  }
}
