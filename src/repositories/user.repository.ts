import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '@entities/user.entity';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
	// public async searchUser(param) {
	// 	const query = this.createQueryBuilder('user');

	// 	if (param.role) {
	// 		query.andWhere('user.role = :role', { role: param.role });
	// 	}
	// 	if (param.companyId) {
	// 		query.andWhere('user.companyId = :companyId', {
	// 			companyId: param.companyId,
	// 		});
	// 	}
	// 	if (param.groupId) {
	// 		query.andWhere('user.groupId = :groupId', {
	// 			groupId: param.groupId,
	// 		});
	// 	}
	// 	if (param.subgroupId) {
	// 		query.andWhere('user.subgroupId = :subgroupId', {
	// 			subgroupId: param.subgroupId,
	// 		});
	// 	}
	// 	return query.getMany();
	// }

}
