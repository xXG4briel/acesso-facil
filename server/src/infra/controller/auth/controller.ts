import { Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(
        private jwtService: JwtService
      ) {}

    @Post("/companys")
    async loginCompanys() {
        return { access_token: await this.jwtService.signAsync({
            "password": "teste",
            "email": "teste4@gmail.com"
          }) };
    }
    @Post("/visitors")
    async loginVisitors() {
        return { access_token: await this.jwtService.signAsync({
            "password": "teste",
            "email": "teste4@gmail.com"
          }) };
    }
}
