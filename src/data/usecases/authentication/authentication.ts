import { AccountModel } from '../../../domain/models/accountModel'
import InvalidCredentialsError from '../../../domain/errors/invalidCredentialsError'
import UnexpectedError from '../../../domain/errors/unexpectedError'
import { AuthenticationParams } from '../../../domain/usecases/authentication/authentication'
import { HttpPostClient } from '../../protocols/http/httpPostClient'
import { HttpStatusCode } from '../../protocols/http/httpResponseClient'

export default class Authentication implements Authentication {
	constructor(
		private readonly url: string,
		private readonly httpPostClient: HttpPostClient<
			AuthenticationParams,
			AccountModel
		>
	) {
		this.url = url
		this.httpPostClient = httpPostClient
	}

	async auth({ email, password }: AuthenticationParams): Promise<AccountModel> {
		const httpResponse = await this.httpPostClient.post({
			url: this.url,
			body: { email, password },
		})

		switch (httpResponse.statusCode) {
			case HttpStatusCode.OK:
				return httpResponse.body
			case HttpStatusCode.UNAUTHORIZED:
				throw new InvalidCredentialsError()
			default:
				throw new UnexpectedError()
		}
	}
}
