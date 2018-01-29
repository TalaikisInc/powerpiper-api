import { Request, Response } from 'express'
import { getManager } from 'typeorm'

import { Post } from '../../entity/post'

export async function GetPosts(page: number) {

    const skip = 10 * page
    const postRepository = await getManager().getRepository(Post)

    const posts = await postRepository
      .createQueryBuilder('post')
      .skip(skip)
      .take(10)

    return posts

}
