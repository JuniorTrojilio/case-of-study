/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponse } from './httpResponseClient'

export type HttpPostType<T> = {
	url: string
	body?: T
}
export interface HttpPostClient<T, R> {
	post({ url, body }: HttpPostType<T>): Promise<HttpResponse<R>>
}
