import { Request, Response } from 'express'
import { getManager } from 'typeorm'

import { Post } from '../../entity/post'
import { User } from '../../entity/user'
import { Category } from '../../entity/category'

export async function DeletePost(id: number) {

    const postRepository = getManager().getRepository(Post)

    postRepository
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('id = :i', { i: id })
        .execute()

}
