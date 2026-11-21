import { Module } from '@nestjs/common'

import { AppController } from './app.controller.js'
import { AppService } from './app.service.js'
import GlobalModule from './global/global.module.js'
import { AuthModule } from './modules/auth/auth.module.js'

@Module({
  imports: [AuthModule, GlobalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}