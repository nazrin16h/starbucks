import axiosInstance from './instance.js'
async function getMenu() {
    const res = await axiosInstance.get('/menus')
    return res.data
}
export{
    getMenu
}