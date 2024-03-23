const bytesToGibs = (bytes, round = false) => {
    const gibs = bytes / 1024 / 1024 / 1024
    return round ? Math.round(gibs * 100) / 100 : gibs
}

const bytesToTibs = (bytes, round = false) => {
    const tibs = bytes / 1024 / 1024 / 1024 / 1024
    return round ? Math.round(tibs * 100) / 100 : tibs
}

export {
    bytesToGibs, bytesToTibs
}