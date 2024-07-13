import BaseLayout from '~/components/base-layout'
import Upload from './upload'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '~/configs/firebase.config'

const UpdateProfile = async () => {
    const imgRef = ref(storage, 'images/bg.png')
    const url = await getDownloadURL(imgRef)
    console.log('url', url)

    return (
        <BaseLayout>
            <Upload />
        </BaseLayout>
    )
}

export default UpdateProfile
