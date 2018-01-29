import { Request, Response } from 'express'
import { getManager } from 'typeorm'

import { Post } from '../../entity/post'
import { User } from '../../entity/user'
import { Category } from '../../entity/category'

export async function SavePost(title: string, content: string, image: string, authors: number[], categories: number[]) {

    const postRepository = getManager().getRepository(Post)

    const post = new Post()
    post.title = title
    // slug is made automatically inside Post entity event listener
    post.content = content
    post.image = image

    const authorsArray: User[] = []
    const categoriesArray: Category[] = []

    if (authors.length > 0) {
        authors.forEach((authorId) => {
            const a = new User()
            a.id = authorId
            authorsArray.push(a)
        })
    }

    if (categories.length > 0) {
        categories.forEach((catId) => {
            const a = new Category()
            a.id = catId
            categoriesArray.push(a)
        })
    }
    post.authors = authorsArray
    post.categories = categoriesArray

    postRepository.save(post)

    return post

}
