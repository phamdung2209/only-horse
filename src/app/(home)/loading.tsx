import { Loader } from 'lucide-react'

import BaseLayout from '~/components/base-layout'

const Loading = () => {
    return (
        <BaseLayout>
            <div className="mt-20 w-full flex justify-center">
                <div className="flex flex-col items-center gap-2">
                    <Loader className="w-10 h-10 animate-spin text-muted-foreground" />
                    <h3 className="text-xl font-bold">My friend, you are almost there!</h3>
                    <p>Please wait...</p>
                </div>
            </div>
        </BaseLayout>
    )
}

export default Loading
