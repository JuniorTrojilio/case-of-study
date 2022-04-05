import { HttpStatusCode } from '../../protocols/http/httpResponseClient'
import { AccountModel } from '../../../domain/models/accountModel'
import InvalidCredentialsError from '../../../domain/errors/invalidCredentialsError'
import UnexpectedError from '../../../domain/errors/unexpectedError'
import { AuthenticationParams } from '../../../domain/usecases/authentication/authentication'
import HttpPostClientSpy from '../../mocks/httpPostClientSpy'
import Authentication from './authentication'
import { mockAccountModel, mockAuthenticationBody } from '../../mocks/shared'

type SutTypes = {
	authenticationSut: Authentication
	httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url = 'any_url'): SutTypes => {
	const httpPostClientSpy = new HttpPostClientSpy<
		AuthenticationParams,
		AccountModel
	>()
	const authenticationSut = new Authentication(url, httpPostClientSpy)
	return {
		authenticationSut,
		httpPostClientSpy,
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

	test('should throw Invalid Credentials on httpPostClient returns 401', async () => {
		const { httpPostClientSpy, authenticationSut } = makeSut()
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.UNAUTHORIZED,
			body: {} as AccountModel,
		}
		const promise = authenticationSut.auth(mockAuthenticationBody())
		await expect(promise).rejects.toThrowError(new InvalidCredentialsError())
	})

	test('should throw Unexpected Error if httpPostClient returns 400 ', async () => {
		const { httpPostClientSpy, authenticationSut } = makeSut()
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.BAD_REQUEST,
			body: {} as AccountModel,
		}
		const promise = authenticationSut.auth(mockAuthenticationBody())
		await expect(promise).rejects.toThrowError(new UnexpectedError())
	})

	test('should throw Unexpected Error if httpPostClient returns 404 ', async () => {
		const { httpPostClientSpy, authenticationSut } = makeSut()
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.NOT_FOUND,
			body: {} as AccountModel,
		}
		const promise = authenticationSut.auth(mockAuthenticationBody())
		await expect(promise).rejects.toThrowError(new UnexpectedError())
	})

	test('should throw Unexpected Error if httpPostClient returns 500 ', async () => {
		const { httpPostClientSpy, authenticationSut } = makeSut()
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
			body: {} as AccountModel,
		}
		const promise = authenticationSut.auth(mockAuthenticationBody())
		await expect(promise).rejects.toThrowError(new UnexpectedError())
	})

	test('should return account model if httpPostClient returns 200 ', async () => {
		const { httpPostClientSpy, authenticationSut } = makeSut()
		const httpResponse = mockAccountModel()
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.OK,
			body: httpResponse,
		}
		const account = await authenticationSut.auth(mockAuthenticationBody())
		expect(account).toEqual(httpResponse)
	})
})
