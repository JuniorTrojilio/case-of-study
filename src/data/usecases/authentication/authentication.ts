import { AuthenticationParams } from '../../../domain/usecases/authentication'
import { HttpPostClient } from '../../protocols/http/httpPostClient'

export default class Authentication {
	constructor(
		private readonly url: string,
		private readonly httpPostClient: HttpPostClient
	) {
		this.url = url
		this.httpPostClient = httpPostClient
	}

	async auth({ email, password }: AuthenticationParams): Promise<void> {
		await this.httpPostClient.post({ url: this.url, body: { email, password } })
	}
}
