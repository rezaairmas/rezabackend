import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';
import { getThrottlerOptions } from './throttler.config'; // Mengambil konfigurasi

@Module({})
export class CustomThrottlerModule {
  static forRoot(): DynamicModule {
    return {
      module: CustomThrottlerModule,
      imports: [
        ConfigModule,
        ThrottlerModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService): ThrottlerModuleOptions => getThrottlerOptions(configService),
          inject: [ConfigService],
        }),
      ],
      exports: [ThrottlerModule], // Pastikan ThrottlerModule diekspor jika digunakan di module lain
    };
  }
}
