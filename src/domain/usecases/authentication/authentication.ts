import { AccountModel } from '../../models/accountModel'

export type AuthenticationParams = {
	email: string
	password: string
}

export interface Authentication {
	auth({ email, password }: AuthenticationParams): Promise<AccountModel>
}
