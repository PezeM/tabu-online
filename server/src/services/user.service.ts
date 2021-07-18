import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';

export class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = this.users;
    return users;
  }

  public async findUserById(userId: number): Promise<User> {
    const findUser: User = this.users.find(user => user.id === userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  // public async createUser(userData: CreateLobbyUser): Promise<User> {
  //   if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
  //
  //   const findUser: User = this.users.find(user => user.email === userData.email);
  //   if (findUser) throw new HttpException(409, `Your email ${userData.email} already exists`);
  //
  //   const hashedPassword = await bcrypt.hash(userData.password, 10);
  //   const createUserData: User = {
  //     id: this.users.length + 1,
  //     ...userData,
  //     password: hashedPassword,
  //   };
  //   this.users = [...this.users, createUserData];
  //
  //   return createUserData;
  // }
  //
  // public async updateUser(userId: number, userData: CreateLobbyUser): Promise<User[]> {
  //   if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
  //
  //   const findUser: User = this.users.find(user => user.id === userId);
  //   if (!findUser) throw new HttpException(409, "You're not user");
  //
  //   const hashedPassword = await bcrypt.hash(userData.password, 10);
  //   const updateUserData: User[] = this.users.map((user: User) => {
  //     if (user.id === findUser.id)
  //       user = {
  //         id: userId,
  //         ...userData,
  //         password: hashedPassword,
  //       };
  //     return user;
  //   });
  //
  //   return updateUserData;
  // }

  public async deleteUser(userId: number): Promise<User[]> {
    const findUser: User = this.users.find(user => user.id === userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    const deleteUserData: User[] = this.users.filter(user => user.id !== findUser.id);
    return deleteUserData;
  }
}
