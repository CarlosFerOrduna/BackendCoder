export const createProductErrorInfo = (product) => {
    const { title, description, code, price, stock, category } = product

    return `One or more properties are incomplete or undefined
    Required properties:
    * title:        ${title || typeof title}
	* description:  ${description || typeof description}
	* code:         ${code || typeof code}
	* price:        ${price || typeof price}
	* stock:        ${stock || typeof stock}
	* category:     ${category || typeof category}`
}

export const invalidFieldErrorInfo = (params) => {
    const { name, type, value } = params
    return `invalid ${name}, must be a ${type} not ${value || typeof value}`
}
