const formatGiBs = (value) => {
    return `${(Math.round(value * 100) / 100).toLocaleString(import.meta.env.VITE_LOCALE)} GiB`;
}

export {
    formatGiBs
}