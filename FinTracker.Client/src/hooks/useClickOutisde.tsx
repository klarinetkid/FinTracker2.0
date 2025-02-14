//https://coreui.io/blog/how-to-detect-a-click-outside-of-a-react-component/

import { RefObject, useEffect } from 'react'

export const useClickOutside = (
    ref: RefObject<HTMLElement | undefined>,
    callback: () => void,
    addEventListener = true,
) => {
    const handleClick = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
            callback()
        }
    }

    useEffect(() => {
        if (addEventListener) {
            document.addEventListener('click', handleClick)
        }

        return () => {
            document.removeEventListener('click', handleClick)
        }
    })
}