import {
	HttpStatusCode,
	HttpResponse,
} from '../protocols/http/httpResponseClient'
import { HttpPostClient, HttpPostType } from '../protocols/http/httpPostClient'

export default class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
	url?: string

	body?: T

	response: HttpResponse<R> = {
		statusCode: HttpStatusCode.OK,
		body: {} as R,
	}

	async post({ url, body }: HttpPostType<T>): Promise<HttpResponse<R>> {
		this.url = url
		this.body = body
		return Promise.resolve(this.response)
	}
}
