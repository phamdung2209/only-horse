import { use } from 'react'
import { Product } from '@prisma/client'

import SuggestedProduct from './suggested-product'
import prisma from '~/db/prisma'

const SuggestedProducts = () => {
    const products: Product[] = use(
        prisma.product.findMany({
            where: {
                isArchived: false,
            },
            orderBy: {
                name: 'asc',
            },
            take: 4,
            distinct: ['name'],
        }),
    )

    return (
        <div className="lg:w-2/5 hidden lg:flex flex-col gap-3 px-2 sticky top-0 right-0 h-screen mt-20">
            <div className="flex flex-col gap-2">
                <p className="uppercase text-muted-foreground font-semibold tracking-tight">
                    Recommended for you
                </p>

                <div className="grid grid-cols-2 gap-4">
                    {products.map((product) => (
                        <SuggestedProduct key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SuggestedProducts
