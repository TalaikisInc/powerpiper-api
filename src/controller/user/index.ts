import { Req, Res, Body, Delete, Get, HttpCode, 
  JsonController, Param, Post, Put, NotFoundError } from 'routing-controllers'
import { Inject } from 'typedi'
import { IUser, UserService, User } from '../../entity/user'

@Inject()
@JsonController('/users')
export class UserController {
  @Inject() private userService: UserService

  @Get('')
  public GetAll() {
    const users = this.userService.getAll()
    if (!users) {
      throw new NotFoundError('Users not found')
    }
    return users
  }

  @Get('/type/:role')
  public GetByRole(@Param('role') role: number) {
    return this.userService.getByRole(role)
  }

  @Get('/user/:id')
  public GetOne(@Param('id') id: string) {
    const user = this.userService.getOne(id)
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

  @Put('/update/:id')
  public Update(@Param('id') id: string, @Body({ required: true }) props: IUser): Promise<void> {
    return this.userService.update(id, props)
  }

  @Delete('/delete/:id')
  public Delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id)
  }

}
