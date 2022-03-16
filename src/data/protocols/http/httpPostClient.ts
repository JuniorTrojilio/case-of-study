export type HttpPostType = {
	url: string
}
export interface HttpPostClient {
	post({ url }: HttpPostType): Promise<void>
}
