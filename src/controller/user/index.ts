import { Req, Res, Body, Delete, Get, HttpCode, OnUndefined, CurrentUser,
  JsonController, Param, Post, Put, NotFoundError, Authorized } from 'routing-controllers'
import { Inject } from 'typedi'

import { IUser, UserService, User } from '../../entity/user'
import { UserNotFoundError } from './error'

@Inject()
@JsonController('/users')
export class UserController {
  @Inject() private userService: UserService

  @Get()
  @Authorized()
  public GetAll() {
    return this.userService.getAll()
  }

  @Get('/type/:role')
  @Authorized()
  public GetByRole(@Param('role') role: number) {
    return this.userService.getByRole(role)
  }

  @Get('/user/:id')
  @Authorized()
  @OnUndefined(UserNotFoundError)
  public GetOne(@Param('id') id: string) {
    const user = this.userService.getOneById(id)
    if (!user) {
      throw new NotFoundError('User not found')
    }
    return user
  }

  @Post()
  @HttpCode(201)
  public Create(@Body({ required: true }) props: IUser): Promise<User> {
    return this.userService.create(props)
  }

  @Post('/signin')
  public Signin(@Body({ required: true }) props: IUser) {
    return this.userService.signin(props)
  }

  @Authorized()
  @Put('/update/:id')
  @OnUndefined(204)
  public Update(@Param('id') id: string, @Body({ required: true }) props: IUser): Promise<void> {
    return this.userService.update(id, props)
  }

  @Authorized()
  @OnUndefined(204)
  @Delete('/delete/:id')
  public Delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id)
  }

}
