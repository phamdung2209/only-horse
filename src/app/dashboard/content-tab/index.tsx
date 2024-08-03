'use client'

import { useMutation } from '@tanstack/react-query'
import { Loader, TriangleAlert } from 'lucide-react'
import { CldUploadWidget, CldVideoPlayer, CloudinaryUploadWidgetInfo } from 'next-cloudinary'
import Image from 'next/image'
import { useState } from 'react'

import UnderlineText from '~/components/decorators/underline-text'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { Button } from '~/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/components/ui/card'
import { Checkbox } from '~/components/ui/checkbox'
import { Label } from '~/components/ui/label'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { Textarea } from '~/components/ui/textarea'
import { createPostAction } from '../actions'
import { useToast } from '~/components/ui/use-toast'
import { ToastAction } from '~/components/ui/toast'

const ContentTab = () => {
    const [textareaValue, setTextareaValue] = useState<string>('')
    const [mediaType, setMediaType] = useState<'video' | 'image'>('image')
    const [isPublic, setIsPublic] = useState<boolean>(false)
    const [mediaUrl, setMediaUrl] = useState<string>('')

    const { toast } = useToast()

    const { mutate: createPost, isPending } = useMutation({
        mutationKey: ['createPost'],
        mutationFn: async () =>
            createPostAction({ text: textareaValue, mediaUrl, mediaType, isPublic }),
        onSuccess: (data) => {
            toast({
                title: 'Post Created',
                description: data.message,
                color: 'green',
            })

            setTextareaValue('')
            setMediaUrl('')
            setIsPublic(false)
        },
        onError: (error) => {
            console.error('Error in createPost mutation', error)
            toast({
                title: 'Uh oh! Something went wrong.',
                description: error.message,
                variant: 'destructive',
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        },
    })

    return (
        <>
            <p className="text-3xl my-5 font-bold text-center uppercase">
                <UnderlineText className="decoration-wavy">Share</UnderlineText> Post
            </p>

            <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault()
                    createPost()
                }}
            >
                <Card className="w-full max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl">New Post</CardTitle>

                        <CardDescription>
                            Share your exclusive content with your audience. Select only one
                            video/image at a time.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                placeholder="Share today’s exclusive content with your audience."
                                required
                                value={textareaValue}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    setTextareaValue(e.target.value)
                                }
                            />
                        </div>

                        <Label>Media Type</Label>
                        <RadioGroup
                            value={mediaType}
                            onValueChange={(value) => setMediaType(value as 'video' | 'image')}
                        >
                            <Label
                                htmlFor="video"
                                className="flex items-center space-x-2 cursor-pointer w-fit"
                            >
                                <RadioGroupItem value="video" id="video" />
                                <p>Video</p>
                            </Label>

                            <Label
                                htmlFor="image"
                                className="flex items-center space-x-2 cursor-pointer w-fit"
                            >
                                <RadioGroupItem value="image" id="image" />
                                <p>Image</p>
                            </Label>
                        </RadioGroup>

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

                        {mediaUrl && mediaType === 'image' && (
                            <div className="flex justify-center relative w-full h-96">
                                <Image
                                    fill
                                    src={mediaUrl}
                                    alt=""
                                    className="object-contain rounded-sm"
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                />
                            </div>
                        )}

                        {mediaUrl && mediaType === 'video' && (
                            <div className="w-full mx-auto">
                                <CldVideoPlayer
                                    width={960}
                                    height={540}
                                    className="rounded-sm"
                                    src={mediaUrl}
                                />
                            </div>
                        )}

                        <Label
                            htmlFor="isPublic"
                            className="flex items-center space-x-2 text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            <Checkbox
                                checked={isPublic}
                                onCheckedChange={(e) => setIsPublic(e as boolean)}
                                id="isPublic"
                            />
                            <p>Mark as public</p>
                        </Label>

                        <Alert variant={'default'} className="text-yellow-500">
                            <TriangleAlert className="w-4 h-4 !text-yellow-500" />
                            <AlertTitle>Warning</AlertTitle>
                            <AlertDescription>
                                Public posts will be visible to all users.
                            </AlertDescription>
                        </Alert>
                    </CardContent>

                    <CardFooter>
                        <Button className="w-full text-white" type="submit" disabled={isPending}>
                            {isPending ? (
                                <Loader className="w-6 h-6 animate-spin text-white" />
                            ) : (
                                'Create Post'
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </>
    )
}

export default ContentTab
