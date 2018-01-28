import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { Post } from '../../entity/Post'

export async function SavePost(request: Request, response: Response) {

    const postRepository = getManager().getRepository(Post)

    const newPost = postRepository.create(request.body)

    await postRepository.save(newPost)

    response.send(newPost)

}
