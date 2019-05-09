// import _ from 'lodash'
import Api from 'utils/api'
// import { formatData } from './utils'

export default {
    getFormData: async updateState => {
        try {
            updateState('acos', { loading: true })
            const response = await Api.getAllData()
            // formatData(response.data)
            updateState('acos', { loading: false, data: response.data })
        } catch (err) {
            updateState('acos', { loading: false, error: err.message })
        } finally {
            return { loading: false }
        }
    },
}
