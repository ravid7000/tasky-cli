const BASE = '/'

export const getUrl = url => `${BASE}${url}`

export const STATIC = {
    logo: getUrl('static/image/site-logo/innovaccer-logo-black.svg'),
    styles: getUrl('static/css/styles.css'),
    bootstrap: getUrl('static/css/bootstrap.min.css'),
}

const createConfig = (url, method) => {
    return {
        method,
        url: getUrl(url),
    }
}

export const API = {
    getData: createConfig('api/get-data/', 'get'),
}
