import {
  Body,
  Controller,
  Logger,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt-nodejs';
import { CompanysService } from 'src/infra/services/companys/companys.service';
import { VisitorsService } from 'src/infra/services/visitors/customers.service';
import { LoginPayload } from './dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly visitorsService: VisitorsService,
    private readonly companysService: CompanysService,
  ) {}

  @Post('/companys')
  async loginCompanys(
    @Body() body: LoginPayload,
  ): Promise<{ access_token: string }> {
    const found = await this.companysService.findByEmailOrIdentity(body);
    const me = found ? { name: found.name.split(' ')[0], avatar: found.url } : {};


    return this.handleAccessToken(found, body, 'companys', me);
  }
  @Post('/visitors')
  async loginVisitors(
    @Body() body: LoginPayload,
  ): Promise<{ access_token: string }> {
    const found = await this.visitorsService.findByEmailOrIdentity(body);
    const me = found ? { name: found.fullName.split(' ')[0], avatar: found.url } : {};

    return this.handleAccessToken(found, body, 'visitors', me);
  }

  private async handleAccessToken(
    found: { password: string; email: string; id: string },
    body: LoginPayload,
    type: 'visitors' | 'companys',
    me: object
  ) {
    this.logger.debug(`params ${JSON.stringify(body, null, 2)}`);

    if (!found || !compareSync(body.password, found.password)) {
      this.logger.warn(`${!found ? 'User not found' : 'Invalid password'}`);
      throw new UnauthorizedException(`Usuário(${type == 'visitors' ? 'Visitante' : 'Empresa'}) ou senha incorreta.`);
    }

    const { email, id } = found;
    const payload = { sub: id, email, type };
    this.logger.log(`user authenticate ${JSON.stringify(payload, null, 2)}`);

    return { access_token: await this.jwtService.signAsync(payload), me };
  }
}
