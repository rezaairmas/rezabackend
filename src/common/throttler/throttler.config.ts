import { ConfigService } from '@nestjs/config';
import { ThrottlerModuleOptions } from '@nestjs/throttler';

export function getThrottlerOptions(configService: ConfigService): ThrottlerModuleOptions {
  const ttl = parseInt(configService.get<string>('THROTTLER_TTL'), 10) || 60;
  const limit = parseInt(configService.get<string>('THROTTLER_LIMIT'), 10) || 10;
  
  return {
    ttl,
    limit,
  };
}
