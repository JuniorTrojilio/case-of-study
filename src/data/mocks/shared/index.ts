import { AccountModel } from '../../../domain/models/accountModel'
import { AuthenticationParams } from '../../../domain/usecases/authentication/authentication'

export const mockAuthenticationBody = (): AuthenticationParams => {
	return {
		email: 'any_email',
		password: 'any_password',
	}
}

export const mockAccountModel = (): AccountModel => {
	return {
		accessToken: 'any_token',
		refreshToken: 'any_refresh_token',
	}
}
