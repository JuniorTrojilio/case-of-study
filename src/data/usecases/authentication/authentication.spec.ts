import InvalidCredentialsError from '../../../domain/errors/invalidCredentialsError'
import { AuthenticationParams } from '../../../domain/usecases/authentication'
import HttpPostClientSpy from '../../mocks/httpPostClientSpy'
import { HttpStatusCode } from '../../protocols/http/httpResponseClient'
import Authentication from './authentication'

type SutTypes = {
	authenticationSut: Authentication
	httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url = 'any_url'): SutTypes => {
	const httpPostClientSpy = new HttpPostClientSpy()
	const authenticationSut = new Authentication(url, httpPostClientSpy)
	return {
		authenticationSut,
		httpPostClientSpy,
	}
}

const mockAuthenticationBody = (): AuthenticationParams => {
	return {
		email: 'any_email',
		password: 'any_password',
	}
}

describe('Authentication', () => {
	test('should call http client with correct URL', async () => {
		const url = 'other_url'
		const { httpPostClientSpy, authenticationSut } = makeSut(url)
		await authenticationSut.auth(mockAuthenticationBody())
		expect(httpPostClientSpy.url).toBe(url)
	})

	test('should call http client with correct body', async () => {
		const { httpPostClientSpy, authenticationSut } = makeSut()
		const mockedBody = mockAuthenticationBody()
		await authenticationSut.auth(mockedBody)
		expect(httpPostClientSpy.body).toEqual(mockedBody)
	})

	test('should throw Invalid Credentials Error if httpPostClient returns 401', () => {
		const { httpPostClientSpy, authenticationSut } = makeSut()
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.UNAUTHORIZED,
		}
		const promise = authenticationSut.auth(mockAuthenticationBody())
		expect(promise).rejects.toThrow(new InvalidCredentialsError())
	})
})
