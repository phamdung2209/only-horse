'use client'

import { useMutation } from '@tanstack/react-query'
import { Loader, Trash } from 'lucide-react'

import { deletePostAction } from '../actions'
import { useToast } from '~/components/ui/use-toast'

const DeletePost = ({ postId }: { postId: string }) => {
    const { toast } = useToast()
    const { mutate: handleDeletePost, isPending } = useMutation({
        mutationKey: ['deletePost'],
        mutationFn: async () => deletePostAction(postId),
        onSuccess: (data) =>
            toast({
                title: 'Deleted!',
                description: data.message,
            }),
        onError: (error) =>
            toast({
                title: 'Hmmm, something went wrong.',
                description: error.message,
                variant: 'destructive',
            }),
    })

    if (isPending) return <Loader className="w-5 h-5 text-muted-foreground animate-spin" />

    return (
        <Trash
            className="w-5 h-5 text-muted-foreground hover:text-red-500 cursor-pointer"
            onClick={() => handleDeletePost()}
        />
    )
}

export default DeletePost
