import BaseLayout from '~/components/base-layout'
import UnderlineText from '~/components/decorators/underline-text'
import ProductCard from '~/components/product-card'
import { products } from '~/dummy_data/db'
import ProductCheckout from './product-checkout'

const Page = ({ params }: { params: { id: string } }) => {
    return (
        <BaseLayout renderRightPanel={false}>
            <div className="px-3 md:px-7 my-20">
                <ProductCheckout product={products.find((p) => p.id === params.id)!} />

                <h1 className="text-3xl text-center mt-20 mb-10 font-bold tracking-tight">
                    More product from{' '}
                    <UnderlineText className="decoration-wavy underline-offset-8">
                        OnlyHorse
                    </UnderlineText>
                </h1>

                <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </BaseLayout>
    )
}

export default Page
