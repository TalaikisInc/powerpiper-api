import { Request, Response } from 'express'
import { getManager } from 'typeorm'

import { Post } from '../../entity/post'

export async function GetPostsByCategoryController(request: Request, response: Response) {

    const postRepository = await getManager().getRepository(Post)

    const posts = await postRepository
      .createQueryBuilder('post')
      .leftJoinAndMapOne('post.author', 'post.author', 'user')
      .leftJoinAndSelect('post.categories', 'categories')
      .skip(5)
      .take(10)

    if (!posts) {
        response.status(404)
        response.end()
        return
    }

    response.send(posts)
}
