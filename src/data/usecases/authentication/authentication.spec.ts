import HttpPostClientSpy from '../../mocks/httpPostClientSpy'
import Authentication from './authentication'

type SutTypes = {
	authenticationSut: Authentication
	httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string): SutTypes => {
	const httpPostClientSpy = new HttpPostClientSpy()
	const authenticationSut = new Authentication(url, httpPostClientSpy)
	return {
		authenticationSut,
		httpPostClientSpy,
	}
}

describe('Authentication', () => {
	test('should call http clientwith correct URL', () => {
		const url = 'any_url'
		const { httpPostClientSpy, authenticationSut } = makeSut(url)
		authenticationSut.auth()
		expect(httpPostClientSpy.url).toBe(url)
	})
})
