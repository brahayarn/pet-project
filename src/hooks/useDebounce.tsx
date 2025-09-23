import { useEffect, useState } from "react"

type Props = {
    value: string | number
    delay?: number
}

const useDebounce = ({ value, delay = 500 }: Props) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const id = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(id)
        }
    }, [value, delay])

    return debouncedValue
}
export default useDebounce