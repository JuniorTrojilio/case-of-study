import HttpPostClientSpy from '../../mocks/httpPostClientSpy'
import Authentication from './authentication'

describe('Authentication', () => {
	test('should call http clientwith correct url', () => {
		const url = 'any_url'
		const httpPostClientSpy = new HttpPostClientSpy()
		const authenticationSut = new Authentication(url, httpPostClientSpy)
		authenticationSut.auth()
		expect(httpPostClientSpy.url).toBe(url)
	})
})
