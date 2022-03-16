export default class UnexpectedError extends Error {
	constructor(public readonly message: string = 'Erro Inesperado') {
		super(message)
		this.name = 'UnexpectedError'
	}
}
