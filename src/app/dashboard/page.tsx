import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { TABS_DASHBOARD } from '~/lib/const'

const Dashboard = ({
    searchParams: { tab = TABS_DASHBOARD[0].id },
}: {
    searchParams: { tab: string }
}) => {
    return (
        <Tabs defaultValue={tab} className="w-full mx-auto my-10 px-2 md:px-10">
            <TabsList className="flex flex-col sm:flex-row w-full mx-auto h-auto">
                {TABS_DASHBOARD.map((tab) => (
                    <Link href={`?tab=${tab.id}`} key={tab.id} className="w-full">
                        <TabsTrigger value={tab.id} className="w-full">
                            {tab.label}
                        </TabsTrigger>
                    </Link>
                ))}
            </TabsList>

            {TABS_DASHBOARD.map((tab) => (
                <TabsContent key={tab.id} value={tab.id}>
                    <tab.component />
                </TabsContent>
            ))}
        </Tabs>
    )
}

export default Dashboard
