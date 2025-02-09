import BaseLayout from '~/components/base-layout'

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return <BaseLayout>{children}</BaseLayout>
}

export default layout
