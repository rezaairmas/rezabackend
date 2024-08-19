import { SetMetadata } from '@nestjs/common';

export const SKIP_THROTTLE_KEY = 'skipThrottle';
export const SkipThrottler = () => SetMetadata(SKIP_THROTTLE_KEY, true);
