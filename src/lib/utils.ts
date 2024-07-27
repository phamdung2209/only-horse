import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const readFileAsDataURL = (file: File | Blob): Promise<string> => {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            if (typeof reader.result === 'string') resolve(reader.result)
        }
        reader.readAsDataURL(file)
    })
}

export const blobFile = (file: File | Blob): string => {
    return URL.createObjectURL(file)
}

// md -> Medium, lg -> Large, xl -> Extra Large, sm -> Small => size product
export const convertSize = (size: string) => {
    switch (size) {
        case 'md':
            return 'Medium'
        case 'lg':
            return 'Large'
        case 'xl':
            return 'Extra Large'
        case 'sm':
            return 'Small'
        default:
            return size
    }
}
