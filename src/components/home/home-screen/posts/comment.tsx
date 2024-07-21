import { Prisma } from '@prisma/client'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

type TCommentWithUser = Prisma.CommentGetPayload<{ include: { user: true } }>

const Comment = ({ comment }: { comment: TCommentWithUser }) => {
    return (
        <div className="flex gap-2 border-b py-2">
            <Avatar>
                <AvatarImage src={comment.user.image!} alt="user image" />
                <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col w-full gap-1">
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm text-muted-foreground">
                        {comment.user.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                        {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                        }).format(new Date(comment.createdAt))}
                    </span>
                </div>
                <p className="text-sm leading-tight">{comment.text}</p>
            </div>
        </div>
    )
}

export default Comment
