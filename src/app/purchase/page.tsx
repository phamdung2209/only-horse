import Link from 'next/link'
import { use } from 'react'

import ZoomedImage from '~/components/zoomed-image'
import UnderlineText from '~/components/decorators/underline-text'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { convertSize } from '~/lib/utils'
import { buttonVariants } from '~/components/ui/button'
import { checkProductPaidAction } from './actions'
import config from '~/configs'

const Page = ({ searchParams }: { searchParams: { orderId: string } }) => {
    const { orderId } = searchParams
    const { product, shippingAddress: shipping, ...order } = use(checkProductPaidAction(orderId))

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <div className="flex flex-col items-center">
                <ZoomedImage
                    imgSrc={product.image}
                    className="rounded-md my-5 md:h-96 md:w-96 sm:h-80 sm:w-80 h-56 w-56"
                />

                <h1 className="text-2xl font-bold mb-4">
                    Purchase <UnderlineText>Successful!</UnderlineText>
                    🎉
                </h1>
                <p className="text-center text-lg mb-6">
                    Your order is being processed and you will receive a comfirmation email shortly.
                    If you don't receive an email within 24 hours, please contact us with your order
                    ID at{' '}
                    <a href="mailto:phamdung.22092003@gmail.com" className="text-blue-500">
                        here
                    </a>
                    . Thank you for shopping with us!
                </p>
                <p className="text-muted-foreground">
                    Order ID:{' '}
                    <span className="font-bold text-foreground text-sky-400">{orderId}</span>
                </p>
                <Card className="w-full my-5">
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between">
                            <p>OnlyHorse T-Shirt</p>
                            <p>
                                {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }).format(product.price)}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p>Size: {convertSize(order.size)}</p>
                            <p>Quantity: 1</p>
                        </div>
                        <div className="mt-4">
                            <h3 className="font-semibold">Shipping Address</h3>
                            <p>Address: {shipping?.address}</p>
                            <p>City: {shipping?.city}</p>
                            <p>State: {shipping?.state}</p>
                            <p>Postal Code: {shipping?.zip}</p>
                            <p>Country: {shipping?.country}</p>
                        </div>
                    </CardContent>
                </Card>

                <p className="text-center text-sm mb-6 text-muted-foreground">
                    Thank for trusting us with your purchase. We hope you enjoy your new items!
                </p>

                <div className="flex justify-center">
                    <Link
                        href={config.routes.merch}
                        className={buttonVariants({ className: 'text-white' })}
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Page
