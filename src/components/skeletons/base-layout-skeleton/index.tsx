import SidebarSkeleton from './sidebar-skeleton'
import SuggestProductsSkeleton from './suggest-products-skeleton'

const BaseLayoutSkeleton = ({
    children,
    renderRightPanel = true,
}: {
    children?: React.ReactNode
    renderRightPanel?: boolean
}) => {
    return (
        <div className="flex max-w-2xl lg:max-w-7xl mx-auto relative">
            <SidebarSkeleton />

            <div className="w-full lg:w-3/5 flex flex-col border-r">{children}</div>
            {renderRightPanel && <SuggestProductsSkeleton />}
        </div>
    )
}

export default BaseLayoutSkeleton
