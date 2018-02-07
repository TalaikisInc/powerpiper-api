import { Delete, Get, Body, HttpCode, OnUndefined, 
  JsonController, Param, Post, Put, Authorized } from 'routing-controllers'
import { Inject } from 'typedi'

import { IPage, PageService, Page } from '../../entity/page'

@Inject()
@JsonController('/pages')
export class PageController {
  @Inject() private pageService: PageService

  @Post()
  @HttpCode(201)
  @Authorized()
  public Create(@Body({ required: true }) props: IPage): Promise<IPage> {
    return this.pageService.create(props)
  }

  @Get('/post/:id')
  @OnUndefined(404)
  public GetOne(@Param('slug') slug: string): Promise<IPage>{
    return this.pageService.getOne(slug)
  }

  @Put('/update/:id')
  @Authorized()
  @OnUndefined(204)
  public Update(@Param('id') id: string, @Body({ required: true }) props: IPage): Promise<void> {
    return this.pageService.update(id, props)
  }

  @Delete('/delete/:id')
  @Authorized()
  @OnUndefined(204)
  public Delete(@Param('id') id: string): Promise<void> {
    return this.pageService.delete(id)
  }

}
