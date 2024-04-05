import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RegisterPayload } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/register')
  async register(@Body() body: RegisterPayload ) {
    return {}
  }
  @Post('/login')
  async login() {
    return {}
  }
  
}
