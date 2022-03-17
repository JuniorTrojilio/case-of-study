export default class InvalidCredentialsError extends Error {
	constructor(public readonly message: string = 'Credênciais Inválidas') {
		super(message)
		this.name = 'InvalidCredentialsError'
	}
}
