import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: any) => {
                return request?.cookies?.token;
            }]),
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        return { userId: payload.userId, username: payload.username };
    }
}