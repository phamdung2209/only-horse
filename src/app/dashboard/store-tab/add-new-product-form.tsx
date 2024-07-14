'use client'

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

const AddNewProductForm = () => {
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [mediaUrl, setMediaUrl] = useState<string>('')

    return (
        <>
            <p className="text-3xl tracking-tighter my-5 font-medium text-center">
                Add <RotatedText>New</RotatedText> Product
            </p>

            <form action="">
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
                                    src={mediaUrl}
                                    alt=""
                                    className="rounded-md object-contain"
                                />
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="flex flex-col">
                        <Button className="w-full text-white" type="submit">
                            Add Product
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </>
    )
}

export default AddNewProductForm
