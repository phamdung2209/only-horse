import BaseLayout from '~/components/base-layout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import ContentTab from './content-tab'

const Dashboard = () => {
    console.log('render Dashboard')

    return (
        <BaseLayout renderRightPanel={false}>
            <Tabs defaultValue="content" className="w-full mx-auto my-10 px-2 md:px-10">
                <TabsList className="flex flex-col sm:flex-row w-full mx-auto h-auto">
                    <TabsTrigger value="content" className="w-full">
                        Content
                    </TabsTrigger>
                    <TabsTrigger value="store" className="w-full">
                        Store
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="w-full">
                        Analytics
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="content">
                    <ContentTab />
                </TabsContent>
                <TabsContent value="store">Change your password here.</TabsContent>
                <TabsContent value="analytics">Analytics</TabsContent>
            </Tabs>
        </BaseLayout>
    )
}

export default Dashboard
