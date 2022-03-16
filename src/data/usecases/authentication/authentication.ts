import { HttpPostClient } from '../../protocols/http/httpPostClient'

export default class Authentication {
	constructor(
		private readonly url: string,
		private readonly http: HttpPostClient
	) {
		this.url = url
		this.http = http
	}

	async auth(): Promise<void> {
		await this.http.post(this.url)
	}
}
