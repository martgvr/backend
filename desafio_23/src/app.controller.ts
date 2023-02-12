import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() 
  @Render('products')
  products() {
    return { message: 'Products if logged' };
  }

  @Get('/login') 
  @Render('login')
  login() {
    return { message: 'Login' };
  }
}
