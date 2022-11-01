import { Module } from '@nestjs/common';
import { LovycaServicesModule } from './modules/lovyca-services/lovyca-services.module';

@Module({
  imports: [LovycaServicesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
