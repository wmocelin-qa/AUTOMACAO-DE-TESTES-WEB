import { faker } from '@faker-js/faker';

export function getTimeStamp() {
    return new Date().getTime()
}

export function getRandomEmail () {
    return `qa-tester-${getTimeStamp}@test.com.br`
}

export function getRandomNumber() {
    return faker.number.hex({min: 10, max:10000})
}