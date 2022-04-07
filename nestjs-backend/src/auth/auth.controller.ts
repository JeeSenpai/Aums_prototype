import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './utils/jwt-auth.guard';
import { LocalAuthGuard } from './utils/local-auth.guard';

@ApiTags('Auth Login')
@Controller('auth')
export class AuthController {
       constructor(private authService: AuthService) {}
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }


}
