import { use } from 'react'
import { notFound } from 'next/navigation'

import UnderlineText from '~/components/decorators/underline-text'
import ProductCard from '~/components/product-card'
import ProductCheckout from './product-checkout'
import prisma from '~/db/prisma'

const Page = ({ params }: { params: { id: string } }) => {
    const product = use(prisma.product.findUnique({ where: { id: params.id } }))

    const products = use(
        prisma.product.findMany({
            where: { isArchived: false, id: { not: params.id } },
            orderBy: { name: 'asc' },
        }),
    )

    if (!product || product.isArchived) return notFound()

    return (
        <div className="px-3 md:px-7 my-20">
            <ProductCheckout product={product!} />

            <h1 className="text-3xl text-center mt-20 mb-10 font-bold tracking-tight">
                More product from{' '}
                <UnderlineText className="decoration-wavy underline-offset-8">
                    OnlyHorse
                </UnderlineText>
            </h1>

            <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default Page
