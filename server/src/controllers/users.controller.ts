import { Controller, Param, Body, Get, Post, Put, Delete, HttpCode, UseBefore } from 'routing-controllers';
import { User } from '@interfaces/users.interface';
import { UserService } from '@services/user.service';

@Controller()
export class UsersController {
  public userService = new UserService();

  @Get('/users')
  async getUsers() {
    const findAllUsersData: User[] = await this.userService.findAllUser();
    return { data: findAllUsersData, message: 'findAll' };
  }

  @Get('/users/:id')
  async getUserById(@Param('id') userId: number) {
    const findOneUserData: User = await this.userService.findUserById(userId);
    return { data: findOneUserData, message: 'findOne' };
  }

  // @Post('/users')
  // @HttpCode(201)
  // @UseBefore(validationMiddleware(CreateLobbyUser, 'body'))
  // async createUser(@Body() userData: CreateLobbyUser) {
  //   const createUserData: User = await this.userService.createUser(userData);
  //   return { data: createUserData, message: 'created' };
  // }
  //
  // @Put('/users/:id')
  // @UseBefore(validationMiddleware(CreateLobbyUser, 'body', true))
  // async updateUser(@Param('id') userId: number, @Body() userData: CreateLobbyUser) {
  //   const updateUserData: User[] = await this.userService.updateUser(userId, userData);
  //   return { data: updateUserData, message: 'updated' };
  // }

  @Delete('/users/:id')
  async deleteUser(@Param('id') userId: number) {
    const deleteUserData: User[] = await this.userService.deleteUser(userId);
    return { data: deleteUserData, message: 'deleted' };
  }
}
