// Libraries
import { Redis } from 'ioredis';

// Dependencies
import { userSessionIdPrefix, redisSessionPrefix } from '../../constants';

export async function removeAllUserSessions (userId: string, redis: Redis): Promise<void> {
  const sessionIds = await redis.lrange(
    `${userSessionIdPrefix}${userId}`,
    0,
    -1,
  );
  const promises = [];
  for (let i = 0; i < sessionIds.length; i += 1) {
    promises.push(redis.del(`${redisSessionPrefix}${sessionIds[i]}`));
  }
  await Promise.all(promises);
}
