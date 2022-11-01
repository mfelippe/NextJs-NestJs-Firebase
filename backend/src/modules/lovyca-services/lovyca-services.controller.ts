import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LovycaServicesService } from './lovyca-services.service';
import { servicesDTO } from './lovycaServices.dto';

@Controller('lovyca-services')
export class LovycaServicesController {
  constructor(private readonly lovycaServicesService: LovycaServicesService) {}

  @Post()
  async create(@Body() data: servicesDTO) {
    return this.lovycaServicesService.create(data);
  }
  @Get(':uid')
  async findAll(@Param('uid') uid: string) {
    return this.lovycaServicesService.findAll(uid);
  }
  @Get('id/:id')
  async findById(@Param('id') id: string) {
    return this.lovycaServicesService.findById(id);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: servicesDTO) {
    return this.lovycaServicesService.update(id, data);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.lovycaServicesService.delete(id);
  }
}
