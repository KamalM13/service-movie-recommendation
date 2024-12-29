import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        // Add custom authentication logic if needed
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        // Handle errors or return the user object
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}
