import { ServiceA } from './app.serviceA';

export class BaseService {
  constructor(private readonly serviceA: ServiceA) {}

  getHello(): string {
    return 'Hello World BASE!';
  }

  doSomeFuncFromA(): string {
    return this.serviceA.getHello();
  }
}
