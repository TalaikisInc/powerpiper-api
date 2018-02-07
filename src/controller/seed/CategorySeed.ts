import { Request, Response } from 'express'
import { getManager } from 'typeorm'

import { Category } from '../../entity/category'
import { slugify } from '../../services'

export async function CategorySeed(request: Request, response: Response) {

    const catRepository = await getManager().getRepository(Category)

    const cat1 = new Category()
    cat1.title = 'Category test 1'
    cat1.slug = slugify(cat1.title)
    cat1.image = 'uploads/test.png'

    const cat2 = new Category()
    cat2.title = 'Test cat ĄĘĖĖ 2 '
    cat2.slug = slugify(cat2.title)
    cat2.image = 'uploads/test2.png'

    const cat3 = new Category()
    cat3.title = 'cat __ test '
    cat3.slug = slugify(cat3.title)
    cat3.image = 'uploads/test3.png'

    catRepository.save([cat1, cat2, cat3])

    const cats = await catRepository.find()

    response.send(cats)
}
