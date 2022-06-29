import { Controller, Get } from '@nestjs/common';
import { ServiceB } from '../service/app.childService'

@Controller()
export class AppController {
  constructor(
    private readonly serviceB: ServiceB,
  ) { }

  @Get('/serviceB')
  getHelloC(): string {
    return this.serviceB.getHello();
  }
}