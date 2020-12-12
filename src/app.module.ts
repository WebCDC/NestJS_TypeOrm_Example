import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Items } from './database/entities/items.entity';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('database.postgres'),
        entities: [Items],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
