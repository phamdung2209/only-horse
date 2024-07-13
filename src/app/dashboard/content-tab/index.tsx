'use client'

import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary'
import { useState } from 'react'

import UnderlineText from '~/components/decorators/underline-text'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Label } from '~/components/ui/label'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { Textarea } from '~/components/ui/textarea'

const ContentTab = () => {
    console.log('render ContentTab')
    const [textareaValue, setTextareaValue] = useState<string>('')
    const [mediaType, setMediaType] = useState<'video' | 'image'>('video')
    const [isPublic, setIsPublic] = useState<boolean>(false)
    const [mediaUrl, setMediaUrl] = useState<string>('')

    return (
        <>
            <p className="text-3xl my-5 font-bold text-center uppercase">
                <UnderlineText className="decoration-wavy">Share</UnderlineText> Post
            </p>

            <form action="">
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
                        <RadioGroup>
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
                            onSuccess={(res) =>
                                setMediaUrl((res.info as CloudinaryUploadWidgetInfo).secure_url)
                            }
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
                    </CardContent>
                </Card>
            </form>
        </>
    )
}

export default ContentTab
