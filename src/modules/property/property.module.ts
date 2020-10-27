import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PropertyController } from './property.controller'
import { PropertyEntity } from '@entities/index'
import { AuthModule } from '@modules/auth/auth.module'
import { PropertyService } from '@services/property.service'
@Module({
    controllers: [PropertyController],
    imports: [TypeOrmModule.forFeature([PropertyEntity]), AuthModule],
    providers: [PropertyService],
    exports: []
})
export class PropertyModule { }