import UnderlineText from '~/components/decorators/underline-text'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import ZoomedImage from '~/components/zoomed-image'

const PurchaseSummary = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <div className="flex flex-col items-center">
                <ZoomedImage imgSrc="/tshirts/1.png" className="h-96 w-96 rounded-md my-5" />
                <h1 className="text-2xl font-bold mb-4">
                    Purchase <UnderlineText>Successful!</UnderlineText>
                    🎉
                </h1>
                <p className="text-center text-lg mb-6">
                    Your order is being processed and you will receive a comfirmation email shortly.
                    If you don't receive an email within 24 hours, please contact us with your order
                    ID at{' '}
                    <a href="mailto:phamdung.22092003@gmail.com" className="text-blue-500">
                        phamdung.22092003@gmail.com
                    </a>
                    . Thank you for shopping with us!
                </p>
                <p className="text-muted-foreground">
                    Order ID:{' '}
                    <span className="font-bold text-foreground text-sky-400">123456789</span>
                </p>
                <Card className="w-full my-5">
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between">
                            <p>1</p>
                            <p>2</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default PurchaseSummary
