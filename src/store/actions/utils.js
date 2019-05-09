import _ from 'lodash'

function addHeaderToData(data, headers) {
    if (_.isEmpty(data) || _.isEmpty(headers)) {
        return {}
    }

    const obj = {}

    _.each(data, (part, index) => {
        obj[headers[index]] = part
    })
    return obj
}

export function formatData(data) {
    if (_.isEmpty(data)) {
        return []
    }

    const headers = _.head(data)
    const obj = []

    _.each(data, (part, i) => {
        if (i > 0) {
            obj.push(addHeaderToData(part, headers))
        }
    })

    console.log(obj)

    return obj
}
