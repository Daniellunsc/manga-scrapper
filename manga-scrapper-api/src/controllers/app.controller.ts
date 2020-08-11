import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { Request } from 'express';  
import { CreateAnimeDto} from './create-anime.dto';
@Controller('anime')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post()
  create(@Body() createAnimeDto: CreateAnimeDto) {
    return createAnimeDto
  }

}
