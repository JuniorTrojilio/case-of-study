import { HttpPostClient } from '../../protocols/http/httpPostClient'
import Authentication from './authentication'

class HttpPostClientSpy implements HttpPostClient {
	url?: string

	async post(url: string): Promise<void> {
		this.url = url
		return Promise.resolve()
	}
}

describe('Authentication', () => {
	test('should call http clientwith correct url', () => {
		const url = 'any_url'
		const httpPostClientSpy = new HttpPostClientSpy()
		const authenticationSut = new Authentication(url, httpPostClientSpy)
		authenticationSut.auth()
		expect(httpPostClientSpy.url).toBe(url)
	})
})
