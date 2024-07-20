'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary'
import Image from 'next/image'
import { useState } from 'react'

import RotatedText from '~/components/decorators/rotated-text'
import { Button } from '~/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { addProductAction } from '../actions'
import { Loader } from 'lucide-react'
import { useToast } from '~/components/ui/use-toast'

const AddNewProductForm = () => {
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [mediaUrl, setMediaUrl] = useState<string>('')
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const { mutate: createProduct, isPending } = useMutation({
        mutationKey: ['createProduct'],
        mutationFn: async () => await addProductAction({ name, price, image: mediaUrl }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['getProducts'] })
            toast({
                title: 'Woohoo!',
                description: data!.message,
            })
            setName('')
            setPrice('')
            setMediaUrl('')
        },
        onError: (error) =>
            toast({
                title: 'Oops!',
                description: error.message,
                variant: 'destructive',
            }),
    })

    return (
        <>
            <p className="text-3xl tracking-tighter my-5 font-medium text-center">
                Add <RotatedText>New</RotatedText> Product
            </p>

            <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault()
                    createProduct()
                }}
            >
                <Card className="w-full max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl">New Product</CardTitle>
                        <CardDescription>
                            Add a new product to your store. Select only one image.{' '}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="OnlyHorse Special"
                                required
                                value={name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setName(e.target.value)
                                }
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="price">Price ($)</Label>
                            <Input
                                id="price"
                                type="number"
                                placeholder="21.99"
                                required
                                value={price}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setPrice(e.target.value)
                                }
                            />
                        </div>

                        <CldUploadWidget
                            signatureEndpoint="/api/sign-image"
                            options={{ sources: ['local', 'unsplash'], folder: 'horse' }}
                            onSuccess={(res, { widget }) => {
                                setMediaUrl((res.info as CloudinaryUploadWidgetInfo).secure_url)
                                widget.close()
                            }}
                        >
                            {({ open }) => {
                                return (
                                    <Button
                                        onClick={() => open()}
                                        variant={'outline'}
                                        type="button"
                                    >
                                        Upload an Image
                                    </Button>
                                )
                            }}
                        </CldUploadWidget>

                        {mediaUrl && (
                            <div className="flex justify-center relative w-full h-96">
                                <Image
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                    src={mediaUrl}
                                    alt=""
                                    className="rounded-md object-contain"
                                />
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="flex flex-col">
                        <Button className="w-full text-white" type="submit" disabled={isPending}>
                            {isPending ? (
                                <Loader className="w-6 h-6 animate-spin " />
                            ) : (
                                'Add Product'
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </>
    )
}

export default AddNewProductForm
