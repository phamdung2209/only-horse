import BaseLayout from '~/components/base-layout'
import UnderlineText from '~/components/decorators/underline-text'
import ProductCard from '~/components/product-card'
import { products } from '~/dummy_data/db'

const Merch = () => {
    return (
        <BaseLayout renderRightPanel={false}>
            <div className="px-3 md:px-10 my-10">
                <h1 className="text-3xl text-center my-5 font-bold tracking-tight">
                    Our <UnderlineText className="decoration-wavy">Products</UnderlineText>
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

export default Merch