import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { Property } from '@app/models/entities/tro_properties.entity';
@Injectable()
@EntityRepository(Property)
export class PropertyRepository extends Repository<Property> {
}
