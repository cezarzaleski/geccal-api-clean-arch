import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollectionModule } from './collection/collection.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [CollectionModule],
})
export class AppModule {}
