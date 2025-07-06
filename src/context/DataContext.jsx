import { createContext, useEffect, useState } from "react"
import { getAllDetails, getGiftPage,  getMenu } from "../services/api"

export const DATA = createContext(null)
function DataContext({ children }) {
    const [data, setData] = useState(null)
    const [details, setDetails] = useState(null)
    const [gifts, setGifts] = useState(null)
    useEffect(() => {
        getMenu().then(res => setData(res))
        getAllDetails().then(res => setDetails(res))
        getGiftPage().then(res => setGifts(res))
    }, [])

    return (
        <DATA.Provider value={{ data, details, gifts }}>
            {children}
        </DATA.Provider>
    )
}

export default DataContext