import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { Post } from '../../entity/post'

export async function GetPostByIdController(request: Request, response: Response) {

    const postRepository = await getManager().getRepository(Post)

    const post = await postRepository.findOneById(request.params.id)

    if (!post) {
        response.status(404)
        response.end()
        return
    }

    response.send(post)
}
