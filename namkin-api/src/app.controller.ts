import { Controller } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';

@Controller()
export class AppController {
  constructor(private productsService: ProductsService) {}
}
