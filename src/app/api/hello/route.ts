export const GET = async (ctx: Record<string, any>) => {
    const hostName = ctx.url

    return Response.json({
        data: [
            {
                id: 1,
                name: 'James Smith',
                position: 'Head Trainer',
                description:
                    'James is our expert in horse training and riding instruction with over 15 years of experience',
            },
            {
                id: 2,
                name: 'Dr. Emily Carter',
                position: 'Equine Veterinarian',
                description:
                    'Dr. Carter is our resident veterinarian, dedicated to maintaining the health of our horses.',
            },
            {
                id: 3,
                name: 'Michael Ramirez',
                position: 'Groom and Stable Hand',
                description:
                    'Michael is responsible for the daily care of our horses, including feeding and grooming. ',
            },
        ],
        meta: {
            pagination: {
                total: 643,
                count: 15,
                per_page: 15,
                current_page: 10,
                total_pages: 43,
                links: {
                    previous: `${hostName}?page=9?per_page=15`,
                    next: `${hostName}?page=11?per_page=15`,
                },
            },
        },
    })
}

export const POST = async () => {
    return Response.json({
        message: 'Server says hello!',
    })
}

export const PUT = async () => {
    return Response.json({
        message: 'Server says hello!',
    })
}

export const DELETE = async () => {
    return Response.json({
        message: 'Server says hello!',
    })
}

export const PATCH = async () => {
    return Response.json({
        message: 'Server says hello!',
    })
}

export const OPTIONS = async () => {
    return Response.json({
        message: 'Server says hello!',
    })
}

export const HEAD = async () => {
    return Response.json({
        message: 'Server says hello!',
    })
}

export const TRACE = async () => {
    return Response.json({
        message: 'Server says hello!',
    })
}
