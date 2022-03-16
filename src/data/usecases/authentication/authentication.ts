import { HttpPostClient } from '../../protocols/http/httpPostClient'

export default class Authentication {
	constructor(
		private readonly url: string,
		private readonly httpPostClient: HttpPostClient
	) {
		this.url = url
		this.httpPostClient = httpPostClient
	}

	async auth(): Promise<void> {
		await this.httpPostClient.post({ url: this.url })
	}
}
