import { AccountModel } from '../models/accountModel'

type AuthenticationParams = {
	email: string
	password: string
}

export interface Authentication {
	auth({ email, password }: AuthenticationParams): Promise<AccountModel>
}
