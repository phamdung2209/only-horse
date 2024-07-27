'use client'

import { useState } from 'react'
import { Product } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '~/components/ui/select'
import { useToast } from '~/components/ui/use-toast'
import ZoomedImage from '~/components/zoomed-image'
import { createCheckoutAction } from './actions'

const ProductCheckout = ({ product }: { product: Product }) => {
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const { toast } = useToast()
    const router = useRouter()

    const { mutate: createCheckoutSession, isPending } = useMutation({
        mutationKey: ['buyProduct'],
        mutationFn: createCheckoutAction,
        onSuccess: ({ url }) => {
            if (url) router.push(url)
            else throw new Error('Error creating checkout session. Please try again later')
        },
        onError(error) {
            toast({
                title: 'Oops!',
                description: error.message,
                variant: 'destructive',
            })
        },
    })

    const handleBuyProduct = async () => {
        if (!selectedSize) {
            toast({
                title: 'Oops!',
                description: 'Please select a size to continue',
                variant: 'destructive',
            })
            return
        }

        // call mutation
        createCheckoutSession({ productId: product.id, size: selectedSize })
    }

    return (
        <div className="flex flex-col md:flex-row gap-5">
            <ZoomedImage imgSrc={product.image} />

            <div className="w-full">
                <h1 className="text-2xl md:text-4xl font-bold">{product.name}</h1>
                <p className="text-muted-foreground text-base">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                        product.price,
                    )}
                </p>
                <Label className="mt-5 inline-block">Size</Label>

                <Select onValueChange={setSelectedSize}>
                    <SelectTrigger className="w-[180px] focus:ring-0">
                        <SelectValue placeholder="Select Size" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="sm">Small</SelectItem>
                        <SelectItem value="md">Medium</SelectItem>
                        <SelectItem value="lg">Large</SelectItem>
                    </SelectContent>
                </Select>

                <Button
                    className="mt-5 text-white px-5 py-2 rounded-md"
                    size={'sm'}
                    onClick={() => handleBuyProduct()}
                    disabled={isPending}
                >
                    {isPending ? <Loader className="w-6 h-6 animate-spin" /> : 'Buy Now'}
                </Button>
            </div>
        </div>
    )
}

export default ProductCheckout
