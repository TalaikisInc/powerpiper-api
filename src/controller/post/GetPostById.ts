import { getManager } from 'typeorm'

import { Post } from '../../entity/post'

export async function GetPostById(id: number) {

    const postRepository = await getManager().getRepository(Post)

    const post = await postRepository.findOneById(id)

    return post

}
