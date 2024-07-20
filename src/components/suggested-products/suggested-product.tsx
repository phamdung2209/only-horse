import { Product } from '@prisma/client'
import Link from 'next/link'

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { cn } from '~/lib/utils'
import { Button, buttonVariants } from '../ui/button'
import config from '~/configs'
import ZoomedImage from '../zoomed-image'

const SuggestedProduct = ({ product }: { product: Product }) => {
    return (
        <Card className="flex flex-col">
            <CardHeader className="px-2 flex flex-row items-center justify-between space-y-0 pb-0">
                <CardTitle className="text-sm font-medium">
                    <p className="w-28 truncate">{product.name}</p>
                </CardTitle>

                <span className="text-sm text-muted-foreground">
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(product.price)}
                </span>
            </CardHeader>

            <CardContent className="flex flex-col flex-1 gap-2 p-2">
                <ZoomedImage imgSrc={product.image} className="h-48" />

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
            </CardContent>
        </Card>
    )
}

export default SuggestedProduct
