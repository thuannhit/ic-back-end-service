import { Injectable, Dependencies, HttpStatus, HttpException } from '@nestjs/common';
// import { MailerService } from '@nestjs-modules/mailer';

import * as bcrypt from 'bcrypt';
import { jwtConstants, TokenType, INTERNAL_ERROR_CODE } from '@commons/constants';
import { User as UserEntity } from '@entities/user.entity';

import { toUserDto, toUserToken } from '@utilities/mapper';
import { isPasswordMatched, isValidEmail } from '@utilities/index';

import { UserSearchRequest } from '@dtos/user/user-search.request';
import { UserToken, JwtPayload, NewUser } from '@interfaces/index';
import { UserDto } from '@dtos/user/user';

import { UserRepository } from '@repositories/user.repository';
import { UserTokensRepository } from '@repositories/user_tokens.repository';

import { UserRegistrationRequest } from '@dtos/user/user-registration.request';
import { UserLoginRequest } from '@dtos/user/user-login.request';
import { type } from 'os';
import { UserTokensEntity } from '@app/models/entities';

import { BadRequestException } from '@custom-exceptions/*'
// @Dependencies(UserRepository)
@Injectable()
export class UserService {
	//Init variables
	private readonly usersList: UserEntity[] = [];

	//Init Service
	constructor(
		private readonly userRepository: UserRepository,
		private readonly userTokensRepository: UserTokensRepository,
		// private readonly mailerService: MailerService,
	) {
		// this.userRepository = userRepository;

		// this.usersList = [
		// 	{
		// 		id: 1,
		// 		name: 'john',
		// 		password: '123',
		// 		email: 'vinh.nguyen2303@outlook.com',
		// 		tel: 123123123,
		// 		isActive: 1,
		// 		role: 1,
		// 		companyRole: 1,
		// 		groupRole: 1,
		// 		subgroupRole: 1,
		// 		companyId: 1,
		// 		groupId: 1,
		// 		subgroupId: 1,
		// 		createdAt: new Date(),
		// 		updatedAt: new Date(),
		// 	},
		// ];
	}

	// async findOne(email: string): Promise<User | undefined> {
	// 	return this.usersList.find(user => user.email === email);
	// }


	doRegisterUser(userRegistrationData: UserRegistrationRequest) {
		try {
			const user = new UserEntity();
			user.name = userRegistrationData.fullName;
			user.password = userRegistrationData.password;
			user.email = userRegistrationData.email;
			user.tel = userRegistrationData.tel;
			user.isActive = 0;
			user.role = 1;
			user.companyId = 1;
			user.createdAt = new Date(Date.now());
			user.updatedAt = new Date(Date.now());

			this.userRepository.insert(user);

			// this.mailerService
			// 	.sendMail({
			// 		to: 'enjoyvinh@gmail.com',
			// 		from: 'vinh.nguyen2303@outlook.com',
			// 		subject: 'Testing Nest Mailermodule with template ✔',
			// 		template: __dirname + '/welcome', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
			// 		context: {
			// 			// Data to be sent to template engine.
			// 			code: 'cf1a3f828287',
			// 			username: 'john doe',
			// 		},
			// 	})
			// 	.then((success) => {
			// 		console.log(success)
			// 	})
			// 	.catch((err) => {
			// 		console.log(err)
			// 	});

			return 'ok';
		} catch (e) {
			return 'error: ' + e;
		}
	}

	async findByLogin({ email, password }: UserLoginRequest): Promise<UserDto> {
		const user = await this.userRepository.findOne({ where: { email } });

		if (!user) {
			throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
		}

		// compare passwords
		const areEqual = await isPasswordMatched(user.password, password);
		if (!areEqual) {
			throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
		}

		return toUserDto(user);
	}

	async findByPayload({ email }: JwtPayload): Promise<UserDto> {
		const user = await this.userRepository.findOne({ where: { email } });
		if (!user) {
			throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
		}
		return toUserDto(user);
	}

	async findByEmail(email: string): Promise<UserDto | null> {
		const user = await this.userRepository.findOne({ where: { email } });
		if (user) {
			return toUserDto(user);
		}
		return null
	}

	async createNewUser(newUser: UserRegistrationRequest): Promise<UserDto> {
		if (isValidEmail(newUser.email) && newUser.password) {
			const userInDb = await this.findByEmail(newUser.email);
			if (userInDb) {
				throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
			}
			const user: UserEntity = await this.userRepository.create({
				name: newUser.fullName,
				password: await bcrypt.hash(newUser.password, jwtConstants.saltRounds),
				email: newUser.email,
				tel: newUser.tel,
				role: 1,
				companyRole: 1,
				groupRole: 1,
				subgroupRole: 1,
				companyId: 1,
				groupId: 1,
				subgroupId: 1,
				isActive: 1
			});

			await this.userRepository.save(user);

			return toUserDto(user);
		} else {
			throw new HttpException('REGISTRATION.MISSING_MANDATORY_PARAMETERS', HttpStatus.FORBIDDEN);
		}

	}

	async setCurrentRefreshToken(refreshToken: string, _user_id: number): Promise<UserToken> {

		const hashedRefreshToken: string = await bcrypt.hash(refreshToken, jwtConstants.saltRounds)
		let token = await this.userTokensRepository.findOne({ user_id: _user_id, token_type: TokenType.RefreshToken });
		if (!token) {
			const newToken: UserTokensEntity = await this.userTokensRepository.create({
				user_id: _user_id, token_type: TokenType.RefreshToken, token_value: hashedRefreshToken,
				is_deleted: 0, created_by: _user_id, updated_by: _user_id
			})
			await this.userTokensRepository.save(newToken);

			return toUserToken(newToken)
		} else {
			token.token_value = hashedRefreshToken
			const updatedToken: UserTokensEntity = await this.userTokensRepository.save(token);
			return toUserToken(updatedToken)
		}
	}

	async getUserIfRefreshTokenMatches(refreshToken: string, payload: JwtPayload): Promise<UserDto> {
		const usertoken = await this.userTokensRepository.findOne({ user_id: payload.user_id, token_type: TokenType.RefreshToken });
		if (usertoken == undefined) {
			throw new HttpException('Token not found', HttpStatus.BAD_REQUEST);
		}

		const isRefreshTokenMatching = await bcrypt.compare(
			refreshToken,
			usertoken.token_value
		);

		if (isRefreshTokenMatching) {
			return await this.findByPayload(payload)
		} else {
			throw new HttpException('Token not match', HttpStatus.BAD_REQUEST);
		}
	}

	async getUserIfPasswordMatches(email: string, plainTextPassword: string): Promise<UserDto> {
		const user = await this.userRepository.findOne({ email: email })
		if (!user) {
			throw new BadRequestException('Invalid email', INTERNAL_ERROR_CODE.INVALID_USER_NAME);
		}
		const passwordMatched = await isPasswordMatched(user.password, plainTextPassword);
		if (passwordMatched) {
			return toUserDto(user)
		}
		throw new BadRequestException('Wrong password', INTERNAL_ERROR_CODE.INVALID_PASSWORD);
	}




}
