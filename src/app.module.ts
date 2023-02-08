import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';



@Module({
  imports: [ProductModule, MongooseModule.forRoot('mongodb+srv://luiggimarquez:LuiggiMarquez@backendcordercourse.el27giy.mongodb.net/nest?retryWrites=true&w=majority'), ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
  }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
