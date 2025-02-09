import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import FormUpload from './form-upload'

const Page = () => {
    return (
        <div className="px-2 md:px-10 my-20">
            <Card>
                <CardHeader>
                    <CardTitle>Update File</CardTitle>

                    <CardContent>
                        <FormUpload />
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    )
}

export default Page
