import Link from 'next/link'
import { TProduct } from './suggested-products/suggested-product'
import { Button, buttonVariants } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import ZoomedImage from './zoomed-image'
import config from '~/configs'
import { cn } from '~/lib/utils'
import UnderlineText from './decorators/underline-text'

const ProductCard = ({
    product,
    adminView = false,
}: {
    product: TProduct
    adminView?: boolean
}) => {
    return (
        <Card className="flex flex-col">
            <CardHeader className="px-2 flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>{product.name}</CardTitle>
                <span className="text-sm">
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(product.price)}
                </span>
            </CardHeader>

            <CardContent className="flex flex-col flex-1 gap-10">
                <ZoomedImage imgSrc={product.image} />
                <div className="flex justify-center mt-auto">
                    {adminView ? (
                        <Button className="w-full" variant={'outline'}>
                            Archive
                        </Button>
                    ) : (
                        <Button asChild>
                            <Link
                                href={config.routes.merch + `/${product.id}`}
                                className={cn(
                                    'w-full',
                                    buttonVariants({
                                        size: 'sm',
                                        className: 'text-white',
                                    }),
                                )}
                            >
                                Buy
                            </Link>
                        </Button>
                    )}
                </div>
            </CardContent>

            <div className="px-6 pb-6">
                {adminView ? (
                    <span
                        className={cn(
                            'text-sm font-medium',
                            product.isArchived ? 'text-red-500' : 'text-green-500',
                        )}
                    >
                        <UnderlineText className="decoration-wavy">
                            {product.isArchived ? 'Archived' : 'Live'}
                        </UnderlineText>
                    </span>
                ) : (
                    <span className="text-sm font-medium text-green-500">
                        <UnderlineText className="decoration-wavy">In stock</UnderlineText>
                    </span>
                )}
            </div>
        </Card>
    )
}

export default ProductCard
