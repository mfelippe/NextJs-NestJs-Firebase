import { Module } from '@nestjs/common';
import { LovycaServicesService } from './lovyca-services.service';
import { LovycaServicesController } from './lovyca-services.controller';

@Module({
  controllers: [LovycaServicesController],
  providers: [LovycaServicesService]
})
export class LovycaServicesModule {}
