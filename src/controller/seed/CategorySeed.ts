import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { Category } from '../../entity/category'

export async function CategorySeed(request: Request, response: Response) {

    const catRepository = await getManager().getRepository(Category)

    const cat1 = new Category()
    cat1.title = 'Category test 1'

    const cat2 = new Category()
    cat2.title = 'Test cat ĄĘĖĖ 2 '

    const cat3 = new Category()
    cat3.title = 'cat __ test '

    catRepository.save([cat1, cat2, cat3])

    const cats = await catRepository.find()

    response.send(cats)
}
