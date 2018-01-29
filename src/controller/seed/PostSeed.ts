import { Request, Response } from 'express'
import { getManager } from 'typeorm'

import { Post } from '../../entity/post'
import { Category } from '../../entity/category'
import { User } from '../../entity/user'

export async function PostSeed(request: Request, response: Response) {

    const postRepository = await getManager().getRepository(Post)

    const post1 = new Post()
    post1.title = 'test title no 1'
    post1.content = 'Lorem impusm textum'
    const category1 = new Category()
    category1.title = 'category title'

    const category2 = new Category()
    category2.title = 'category 222 title'

    post1.categories.push(category1)
    post1.categories.push(category2)

    const author1 = new User()
    author1.id = 1
    post1.authors.push(author1)

    const post2 = new Post()
    post2.title = 'test title no 1'
    post2.content = 'Lorem impusm textum'
    const category3 = new Category()
    category3.title = 'category title'

    post2.categories.push(category1)
    post2.categories.push(category2)
    post2.categories.push(category3)
    post2.authors.push(author1)

    await postRepository.save([post1, post2])

    const posts = await postRepository.find()

    response.send(posts)

}
