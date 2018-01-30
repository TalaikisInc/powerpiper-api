import { Req, Res, Body, Delete, Get, HttpCode, JsonController, Param, Post, Put } from 'routing-controllers'
import { Inject } from 'typedi'
import { IPost, PostService, Post as Article } from '../../entity/post'

@Inject()
@JsonController('/posts')
export class PostController {
  @Inject() private postService: PostService

  @Get()
  public GetAll() {
    return this.postService.getAll()
  }

  @Get('/author/:author')
  public GetAllAuthor(@Param('author') author: string) {
    return this.postService.getAllAuthor(author)
  }

  @Get('/category/:category')
  public GetAllCategory(@Param('category') category: string) {
    return this.postService.getAllCategory(category)
  }

  @Get('/post/:id')
  public GetOne(@Param('id') id: string) {
    return this.postService.getOne(id)
  }

  @Post()
  @HttpCode(201)
  public Create(@Body({ required: true }) props: IPost): Promise<Article> {
    return this.postService.create(props)
  }

  @Put('/update/:id')
  public Update(@Param('id') id: string, @Body({ required: true }) props: IPost): Promise<void> {
    return this.postService.update(id, props)
  }

  @Delete('/delete/:id')
  public Delete(@Param('id') id: string): Promise<void> {
    return this.postService.delete(id)
  }
}
