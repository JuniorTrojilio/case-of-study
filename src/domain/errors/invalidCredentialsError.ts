export default class InvalidCredentialsError extends Error {
	constructor() {
		super('CredênciaisInválidas')
		this.name = 'InvalidCredentialsError'
	}
}
