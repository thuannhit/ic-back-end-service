import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'vr_users' })
export class User {
	@PrimaryGeneratedColumn('increment', { type: 'int' })
	id: number;

	@Column('varchar')
	name: string;

	@Column('varchar')
	password: string;

	@Column('varchar')
	email: string;

	@Column('varchar')
	tel: string;

	@Column('tinyint')
	isActive: number;

	@Column('tinyint')
	role: number;

	@Column('tinyint', { nullable: true })
	companyRole: number;

	@Column('tinyint', { nullable: true })
	groupRole: number;

	@Column('tinyint', { nullable: true })
	subgroupRole: number;

	@Column('int')
	companyId: number;

	@Column('int', { nullable: true })
	groupId: number;

	@Column('int', { nullable: true })
	subgroupId: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
