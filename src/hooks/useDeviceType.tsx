import { useLayoutEffect, useState } from 'react'

export type TDeviceType = 'mobile' | 'desktop'
export enum DeviceType {
    MOBILE = 'mobile',
    DESKTOP = 'desktop',
}

const useDeviceType = () => {
    const [deviceType, setDeviceType] = useState<TDeviceType>(DeviceType.DESKTOP)

    useLayoutEffect(() => {
        const userAgent = navigator.userAgent

        if (/Mobi|Android/i.test(userAgent)) {
            setDeviceType('mobile')
        } else {
            setDeviceType('desktop')
        }
    }, [])

    return deviceType
}

export default useDeviceType
