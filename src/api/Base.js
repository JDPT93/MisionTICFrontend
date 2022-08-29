export default class Base {

    url;

    constructor(endpoint) {
        this.url = `http://localhost:8080/api/${endpoint}/`;
        Object.freeze(this);
    }

    fetch(method, path, body, headers) {
        return new Promise((fullfill, reject) => fetch(this.url.concat(path || ''), {
            body: body == null ? null : JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...headers,
            },
            method,
            mode: 'cors',
        }).then(response => response.json().then(response.ok ? fullfill : reject, reject), reject));
    }

    get(path, headers) {
        return this.fetch('GET', path, null, headers);
    }

    post(data, path, headers) {
        return this.fetch('POST', path, data, headers);
    }

}