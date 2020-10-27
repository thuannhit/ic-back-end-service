// import { TaskDto } from '@todo/dto/task.dto';
// import { TodoEntity } from '@todo/entity/todo.entity';
// import { TodoDto } from '@todo/dto/todo.dto';
// import { TaskEntity } from '@todo/entity/task.entity';
import { UserEntity } from '@entities/index';
import { UserTokensEntity } from '@entities/index';
import { PropertyEntity } from '@entities/index';
import { UserDto } from '@dtos/user/user';
import { PropertyCreationResponseDTO } from '@dtos/property';
import { UserToken } from '@interfaces/index';

// export const toTodoDto = (data: TodoEntity): TodoDto => {
//     const { id, name, description, tasks, owner } = data;

//     let todoDto: TodoDto = {
//         id,
//         name,
//         description,
//         owner: owner ? toUserDto(owner) : null,
//     };

//     if (tasks) {
//         todoDto = {
//             ...todoDto,
//             tasks: tasks.map((task: TaskEntity) => toTaskDto(task)),
//         };
//     }

//     return todoDto;
// };

// export const toTaskDto = (data: TaskEntity): TaskDto => {
//     const { id, name } = data;

//     let taskDto: TaskDto = {
//         id,
//         name,
//     };

//     return taskDto;
// };

export const toUserDto = (data: UserEntity): UserDto => {
    const { id, name, email } = data;

    let userDto: UserDto = {
        id,
        username: name,
        email,
    };

    return userDto;
};
export const toUserToken = (data: UserTokensEntity): UserToken => {
    const { token_id, user_id, token_type, token_value } = data;

    const tokenOfUser: UserToken = {
        token_id, user_id, token_type, token_value
    }

    return tokenOfUser;
};
export const toPropertyResDTO = (data: PropertyEntity): PropertyCreationResponseDTO => {
    const {
        property_name,
        company_id,
        group_id,
        sgroup_id,
        company_file_part_1,
        company_file_part_2,
        company_file_part_3,
        company_file_part_4
    } = data;

    const tokenOfUser: PropertyCreationResponseDTO = {
        property_name,
        company_id,
        group_id,
        subgroup_id: sgroup_id,
        company_file_part_1,
        company_file_part_2,
        company_file_part_3,
        company_file_part_4
    }

    return tokenOfUser;
};
