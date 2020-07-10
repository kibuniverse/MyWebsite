
function getPageSendParas() {
    const paramsMap = new Map()
    window.location.search.slice(1).split('&').forEach(item => {
        let [key, value] = item.split('=')
        paramsMap.set(key, value)
    }) 
    return paramsMap
}


export {getPageSendParas}