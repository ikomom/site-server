import { Injectable, CanActivate, ExecutionContext, Controller} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { CatsService } from '../modules/cats/cats.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private catService: CatsService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const type = context.getType();
    const classRole = this.reflector.get<string[]>('roles', context.getClass());
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const rolesOver = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    const rolesMerge = this.reflector.getAllAndMerge<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    // if (roles.includes(this.catService.key)) {
    //   return true;
    // }
    return validateRequest(request);
  }
}

function validateRequest(request: Request) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (request.headers.jwt) {
    return true;
  }
  return false;
}
