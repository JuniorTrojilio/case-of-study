import { HttpPostClient, HttpPostType } from '../protocols/http/httpPostClient'

export default class HttpPostClientSpy implements HttpPostClient {
	url?: string

	body?: object

	async post({ url, body }: HttpPostType): Promise<void> {
		this.url = url
		this.body = body
		return Promise.resolve()
	}
}
