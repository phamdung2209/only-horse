// How I solved this problem:
// https://next-auth.js.org/getting-started/typescript

import { Prisma } from '@prisma/client'

export type TCommentWithUser = Prisma.CommentGetPayload<{ include: { user: true } }>
