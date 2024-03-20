const bytesToGibs = (bytes, round = false) => {
    const gibs = bytes / 1024 / 1024 / 1024
    return round ? Math.round(gibs * 100) / 100 : gibs
}

export {
    bytesToGibs
}