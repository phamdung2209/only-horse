import BaseLayout from '~/components/base-layout'
import Pricing from '~/components/pricing'

const Page = () => {
    return (
        <BaseLayout renderRightPanel={false}>
            <Pricing />
        </BaseLayout>
    )
}

export default Page
