import { Module } from '@nestjs/common';
import { MetaOptionsController } from './meta-options.controller';
import { MetaOptionsService } from './providers/meta-options.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOptions } from './meta-options.entity';

@Module({
  controllers: [MetaOptionsController],
  providers: [MetaOptionsService],
  imports: [TypeOrmModule.forFeature([MetaOptions])],
})
export class MetaOptionsModule {}
