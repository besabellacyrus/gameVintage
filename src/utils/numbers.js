export const numberList = (max) => {
    const numbers = [...Array(max)];

    return numbers.map((item, index) => index + 1);
};

export const formatMoney = (money) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return formatter.format(money);
}
export const parseNumbers = (numbers) => {
    let numberRounds = [];

    numbers.forEach((response) => {
        numberRounds.push(
            {
                numbers: stringListToArray(response.NUMBERS),
                hits: stringListToArray(response.HITS1),
            }
        );
    });

    return numberRounds;
};

export const stringListToArray = (str) => {
    return str.split(',')
        .filter(number => number.trim() !== '')
        .map((number) => parseInt(number));
}