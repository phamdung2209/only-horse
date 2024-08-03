'use client'

import { Loader } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { TABS_DASHBOARD_SKELETON } from '~/lib/const'

const Loading = () => {
    const searchParams = useSearchParams()

    return (
        <>
            <Tabs
                defaultValue={searchParams.get('tab') ?? TABS_DASHBOARD_SKELETON[0].id}
                className="w-full mx-auto my-10 px-2 md:px-10"
            >
                <TabsList className="flex flex-col sm:flex-row w-full mx-auto h-auto">
                    {TABS_DASHBOARD_SKELETON.map((tab) => (
                        <Link href={`?tab=${tab.id}`} key={tab.id} className="w-full">
                            <TabsTrigger value={tab.id} className="w-full">
                                {tab.label}
                            </TabsTrigger>
                        </Link>
                    ))}
                </TabsList>
            </Tabs>

            <div className="mt-20 w-full flex justify-center">
                <div className="flex flex-col items-center gap-2">
                    <Loader className="w-10 h-10 animate-spin text-muted-foreground" />
                    <h3 className="text-xl font-bold">My friend, you are almost there!</h3>
                    <p>Please wait...</p>
                </div>
            </div>
        </>
    )
}

export default Loading
