import { Injectable } from '@nestjs/common';
import { BaseService } from './app.parentService'

@Injectable()
export class ServiceB extends BaseService {
  getHello(): string {
    return this.doSomeFuncFromA();
  }
}