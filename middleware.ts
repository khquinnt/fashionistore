import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(req: NextRequest) {
	const { cookies } = req

	const refreshToken = cookies.get('refreshToken')?.value

	if (req.url.includes('/cart') && !req.url.includes('/images')) {
		if (!refreshToken) return NextResponse.redirect(new URL('/', req.url))
	} else return NextResponse.next()
}

// export const config = {
// 	matcher: '/'
// }
