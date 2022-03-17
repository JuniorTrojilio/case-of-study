import InvalidCredentialsError from '../../../domain/errors/invalidCredentialsError'
import UnexpectedError from '../../../domain/errors/unexpectedError'
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
		const httpResponse = await this.httpPostClient.post({
			url: this.url,
			body: { email, password },
		})

		switch (httpResponse.statusCode) {
			case HttpStatusCode.OK:
				break
			case HttpStatusCode.UNAUTHORIZED:
				throw new InvalidCredentialsError()
			default:
				throw new UnexpectedError()
		}
	}
}
