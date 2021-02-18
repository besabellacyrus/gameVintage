const TRANSACTIONS_WITHOUT_NEXT = [
    'GAMELOGIN',
    'GETCONFIG',
    'START',
    'START',
    'PLAY',
];

export function parseResponse(response) {
    let result = {};

    const parts = response.split('&');

    parts.forEach(part => {
        const values = part.split('=');

        if(values.length) {
        result[values[0]] = values[1];
        }
    })

    return result;
}

export const getAcValue = (data) => {
    const keys = Object.keys(data);
    let value = null;

    keys.forEach(key => {
        if(/^ac\d/i.test(key)) {
            value = data[key];
        }
    });

    return value;
}

export const prepPayload = (previousResponse, payload) => {
    const keys = Object.keys(previousResponse);

    keys.forEach(key => {
        if(/^ac\d/i.test(key)) {
            const TRANSTYPE = previousResponse[key];
            const numbers = /(\d)+/.exec(key);


            if(numbers && numbers.length && TRANSACTIONS_WITHOUT_NEXT.indexOf(payload.TRANSTYPE)) {
                const NEXT = numbers[0];
                payload = {
                    ...payload,
                    NEXT,
                    TRANSTYPE,
                }
            }
        }
    });

    return payload;
}