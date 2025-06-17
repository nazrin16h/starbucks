import axiosInstance from './instance.js'
async function getMenu() {
    const res = await axiosInstance.get('/menus')
    return res.data
}
async function getAllDetails() {
    const res = await axiosInstance.get("/details")
    return res.data
}
async function getGiftPage() {
    const res = await axiosInstance.get('/gift')
    return res.data
}
export {
    getMenu, getGiftPage, getAllDetails
}