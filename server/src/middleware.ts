import { Injectable, Logger, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    
    private readonly logger = new Logger(AuthMiddleware.name);

    constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    
    const token = req.headers.authorization?.replace('Bearer ', '');

    try {
        if( /^(?!\/login|register).*/.test(req.baseUrl) ) {
            this.logger.debug('token ' + token);

            this.jwtService.verify(token);
            // TODO -> VALIDAR ACESSO DO TYPE POR ROTA 
            const decoded = this.jwtService.decode(token);

            this.logger.debug(decoded);

            req['decoded'] = decoded;
        }
    }
    catch (err) {
        throw new UnauthorizedException('Sessão expirada')
    }

    next();
  }
}
