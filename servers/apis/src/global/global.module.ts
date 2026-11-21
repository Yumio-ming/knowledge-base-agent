import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { z } from 'zod'
@Module({
  imports: [
    ConfigModule.forRoot({
      // isGlobal: true,
      validationSchema: z.object({
        NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
        PORT: z.coerce.number().default(3000),
      }),
    }),
  ],
})
export default class GlobalModule {}