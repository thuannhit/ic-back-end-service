import { Injectable, Dependencies, HttpStatus, HttpException } from '@nestjs/common';

import { User as UserEntity } from '@entities/user.entity';
import { Property as PropertyEntity } from '@entities/tro_properties.entity';

import { toPropertyResDTO } from '@utilities/mapper';

import { PropertyCreationResponseDTO } from '@dtos/property';
import { PropertyCreationRequestDTO } from '@dtos/property';

import { PropertyRepository } from '@repositories/property.repository';

import { type } from 'os';

// @Dependencies(UserRepository)
@Injectable()
export class PropertyService {
    //Init variables
    private readonly usersList: UserEntity[] = [];

    //Init Service
    constructor(
        private readonly propertyRepository: PropertyRepository,
    ) {
    }

    async createNewProperty(newProperty: PropertyCreationRequestDTO): Promise<PropertyCreationResponseDTO> {
        const property: PropertyEntity = await this.propertyRepository.create({
            property_name: newProperty.property_name,
            company_id: newProperty.company_id,
            sgroup_id: newProperty.subgroup_id,
            group_id: newProperty.group_id,
            company_file_part_1: newProperty.company_file_part_1,
            company_file_part_2: newProperty.company_file_part_2,
            company_file_part_3: newProperty.company_file_part_3,
            company_file_part_4: newProperty.company_file_part_4,
        });

        await this.propertyRepository.save(property);

        return toPropertyResDTO(property);
    }
}
