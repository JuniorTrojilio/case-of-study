import InvalidCredentialsError from '../../../domain/errors/invalidCredentialsError'
import { AuthenticationParams } from '../../../domain/usecases/authentication'
import { HttpPostClient } from '../../protocols/http/httpPostClient'
import { HttpStatusCode } from '../../protocols/http/httpResponseClient'

export default class Authentication {
	constructor(
		private readonly url: string,
		private readonly httpPostClient: HttpPostClient
	) {
		this.url = url
		this.httpPostClient = httpPostClient
	}

	async auth({ email, password }: AuthenticationParams): Promise<void> {
		const response = await this.httpPostClient.post({
			url: this.url,
			body: { email, password },
		})
		switch (response.statusCode) {
			case HttpStatusCode.UNAUTHORIZED:
				throw new InvalidCredentialsError()
			default:
				return Promise.resolve()
		}
	}
}
