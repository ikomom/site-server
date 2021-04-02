import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { CatsService } from '../modules/cats/cats.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private catService: CatsService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const type = context.getType();
    const classes = context.getClass();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (roles.includes(this.catService.key)) {
      return true;
    }
    return validateRequest(request);
  }
}

function validateRequest(request: Request) {
  // @ts-ignore
  if (request.headers.jwt) {
    return true;
  }
  return false;
}
