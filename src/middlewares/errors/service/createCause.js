export const invalidFieldErrorInfo = (params) => {
    const { name, type, value } = params
    return `invalid ${name}, must be a ${type} not ${value || typeof value}`
}
