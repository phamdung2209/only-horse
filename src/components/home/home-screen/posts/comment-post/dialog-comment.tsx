'use client'

import { useState } from 'react'
import { Loader, MessageCircle, Send } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'

import { Button } from '~/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { ScrollArea } from '~/components/ui/scroll-area'
import { TPostWithComments } from '../post'
import Comment from './comment'
import { commentPostAction } from '../../actions'
import { useToast } from '~/components/ui/use-toast'

const DialogComment = ({
    isSubscribed,
    post,
}: {
    isSubscribed: boolean
    post: TPostWithComments
}) => {
    const [comment, setComment] = useState<string>('')
    const { toast } = useToast()

    const { mutate: handleComment, isPending: sendingMsg } = useMutation({
        mutationKey: ['comment'],
        mutationFn: async () => {
            if (!comment || sendingMsg) return
            await commentPostAction(post.id, comment)
        },
        onSuccess() {
            setComment('')
        },
        onError(error) {
            toast({
                title: 'Oh no! Something went wrong, try again',
                description: error.message,
                variant: 'destructive',
            })
        },
    })

    return (
        <Dialog>
            <DialogTrigger>
                <div
                    className="flex gap-1 items-center cursor-pointer hover:scale-110 hover:text-red-500 transition-all duration-200 active:scale-95"
                    onClick={() => {
                        if (!isSubscribed) {
                            toast({
                                title: 'Oh no! Something went wrong',
                                description: 'You need to subscribe to comment',
                                variant: 'destructive',
                            })
                            return
                        }
                    }}
                >
                    <MessageCircle className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground text-xs md:text-sm font-semibold tracking-tighter">
                        {post.comments.length}
                    </span>
                </div>
            </DialogTrigger>

            {isSubscribed && (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Comments</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-[400px] rounded-md p-4">
                        {post.comments.length ? (
                            post.comments.map((comment) => (
                                <Comment key={comment.id} comment={comment} />
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full">
                                <p className="text-zinc-400">No comments yet</p>
                            </div>
                        )}
                    </ScrollArea>

                    <DialogFooter className="w-full">
                        <form action={() => handleComment()} className="w-full relative">
                            <Input
                                placeholder="Write a comment..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="pr-12"
                            />
                            <Button
                                type="submit"
                                className="bg-transparent hover:bg-transparent absolute right-0 top-0"
                            >
                                {sendingMsg ? (
                                    <Loader className="w-5 h-5 text-primary animate-spin" />
                                ) : (
                                    <Send className="text-primary cursor-pointer" />
                                )}
                            </Button>
                        </form>
                    </DialogFooter>
                </DialogContent>
            )}
        </Dialog>
    )
}

export default DialogComment
