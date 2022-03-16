import { HttpPostClient, HttpPostType } from '../protocols/http/httpPostClient'

export default class HttpPostClientSpy implements HttpPostClient {
	url?: string

	async post({ url }: HttpPostType): Promise<void> {
		this.url = url
		return Promise.resolve()
	}
}
