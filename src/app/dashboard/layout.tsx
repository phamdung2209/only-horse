import BaseLayout from '~/components/base-layout'

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return <BaseLayout renderRightPanel={false}>{children}</BaseLayout>
}

export default Layout
