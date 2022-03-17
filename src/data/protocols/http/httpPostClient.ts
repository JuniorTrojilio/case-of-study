/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponse } from './httpResponseClient'

export type HttpPostType = {
	url: string
	body?: any
}
export interface HttpPostClient {
	post({ url, body }: HttpPostType): Promise<HttpResponse>
}
