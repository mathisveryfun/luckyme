import { Controller, Get } from '@nestjs/common';
import { ServiceB } from '../service/app.childService'

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return process.env.DATABASE_HOST;
  }
}