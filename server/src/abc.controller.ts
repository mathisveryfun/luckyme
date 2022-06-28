import { Controller, Get, Post, Req, Body } from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './Author/dto/create-cat.dto';

@Controller()
export class CatsController {
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}
