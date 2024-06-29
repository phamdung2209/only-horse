export const GET = async () => {
    return Response.json({
        data: [
            {
                id: 1,
                name: 'Master javascript',
            },
            {
                id: 2,
                name: 'Master typescript',
            },
            {
                id: 3,
                name: 'Master react',
            },
            {
                id: 4,
                name: 'Master angular',
            },
        ],
        success: true,
    })
}
