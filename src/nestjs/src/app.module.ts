import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollectionModule } from './collection/collection.module';
import { ConfigModule } from 'src/config/config.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [CollectionModule, ConfigModule.forRoot()],
})
export class AppModule {}
