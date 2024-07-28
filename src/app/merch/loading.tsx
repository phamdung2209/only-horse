import UnderlineText from '~/components/decorators/underline-text'
import MerchSkeleton from '~/components/skeletons/merch-skeleton'

const Loading = () => {
    return (
        <div className="px-3 md:px-10 my-10">
            <h1 className="text-3xl text-center my-5 font-bold tracking-tight">
                Our <UnderlineText className="decoration-wavy">Products</UnderlineText>
            </h1>

            <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, idx) => (
                    <MerchSkeleton key={idx} />
                ))}
            </div>
        </div>
    )
}

export default Loading
