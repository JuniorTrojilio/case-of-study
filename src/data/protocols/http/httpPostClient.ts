export type HttpPostType = {
	url: string
	body?: object
}
export interface HttpPostClient {
	post({ url, body }: HttpPostType): Promise<void>
}
