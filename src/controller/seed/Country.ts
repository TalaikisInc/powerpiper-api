import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { Country } from '../../entity/country'

export async function CountryController(request: Request, response: Response) {

    const countryRepository = await getManager().getRepository(Country)

    const country1 = new Country()
    country1.title = 'NOT_LISTED_HERE'

    countryRepository.save(country1)

    const countries = await countryRepository.find()

    response.send(countries)
}
