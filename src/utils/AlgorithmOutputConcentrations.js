import { AlgorithmRepository } from "@/repositories/AlgorithmRepository"
import _ from "lodash-es"
import $ from "jquery"

const loadJsons = (runOrderId, runId, /** @type Array */ jsonFiles) => {
    const _deferred = new $.Deferred()

    const algorithmRepository = new AlgorithmRepository()
    const loadPromises = _.map(jsonFiles, (jsonFile) => fetch(algorithmRepository.getOutputFileLink(runOrderId, runId, jsonFile.filePath)))
    
    Promise.all(loadPromises).then(responses => {
        const jsonPromises = []
        _.each(responses, response => {
            if (response.ok) {
                try {
                    jsonPromises.push(response.json())
                } catch (e) {
                    // no-ops by intention
                }
            }
        })

        Promise.all(jsonPromises).then(results => {
            _deferred.resolve(results)
        })
    })

    return _deferred.promise()
}



export { loadJsons }