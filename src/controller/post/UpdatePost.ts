import { Request, Response } from 'express'
import { getManager } from 'typeorm'

import { Post } from '../../entity/post'
import { User } from '../../entity/user'
import { Category } from '../../entity/category'

export async function UpdatePost(article: any) {

    const postRepository = await getManager().getRepository(Post)

    postRepository
      .createQueryBuilder()
      .update(Post)
      .set({
          title: article.title,
          content: article.content,
          image: article.image,
          authors: article.authors,
          categories: article.categories
        })
      .where('id = :id', { id: article.id })
      .execute()

    const post = postRepository
      .createQueryBuilder()
      .select()
      .from(User, 'user')
      .where('user.id = :id', { id: article.id })
      .getOne()

    return post

}
