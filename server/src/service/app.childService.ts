import { Injectable } from '@nestjs/common';
import { BaseService } from './app.parentService'
import { ServiceA } from './app.serviceA'

@Injectable()
export class ServiceB extends BaseService {
  constructor(private readonly _serviceA: ServiceA) {
    super(_serviceA);
  }
  getHello(): string {
    return this.doSomeFuncFromA();
  }
}