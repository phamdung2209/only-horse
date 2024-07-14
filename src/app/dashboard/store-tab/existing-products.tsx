import { X } from 'lucide-react'
import ProductCard from '~/components/product-card'

import ProductSkeleton from '~/components/skeletons/product-skeleton'
import { products } from '~/dummy_data/db'

const ExistingProducts = () => {
    const loading = false

    return (
        <>
            <p className="text-3xl tracking-tighter my-3 font-medium">Existing Products</p>

            {loading ? (
                <div className="flex flex-wrap gap-10 justify-center">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <ProductSkeleton key={i} />
                    ))}
                </div>
            ) : products.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} adminView />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center mt-10 p-6 rounded-lg shadow-md">
                    <X className="h-16 w-16 text-red-600" />
                    <p className="text-center text-xl font-medium text-red-600 mt-4">
                        No products found
                    </p>
                    <p className="text-gray-500 text-center text-base mt-2">
                        Please add new products to see them here.
                    </p>
                </div>
            )}
        </>
    )
}

export default ExistingProducts
