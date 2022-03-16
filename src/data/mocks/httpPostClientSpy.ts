import {
	HttpStatusCode,
	HttpResponse,
} from '../protocols/http/httpResponseClient'
import { HttpPostClient, HttpPostType } from '../protocols/http/httpPostClient'

export default class HttpPostClientSpy implements HttpPostClient {
	url?: string

	body?: object

	response: HttpResponse = {
		statusCode: HttpStatusCode.OK,
	}

	async post({ url, body }: HttpPostType): Promise<HttpResponse> {
		this.url = url
		this.body = body
		return Promise.resolve(this.response)
	}
}
