const fillMissing = (/** @type Array */ data, /** @type string */ dateField, /** @type DateTime */ fromIncl, /** @type DateTime */ toIncl, /** @type string */ stepSize) => {

    const steps = toIncl.diff(fromIncl, stepSize).get(stepSize)

    for (let i = 0; i < steps; i++) {
        const step = fromIncl.plus({ [stepSize]: i })

        if (!data.find(d => d[dateField].equals(step))) {
            data.push({ [dateField]: step, count: 0, size: 0 })
        }
    }

    return data
}

export {
    fillMissing
}