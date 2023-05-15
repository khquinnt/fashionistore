export const phoneRegex = (phone_number: string) => {
	let phone = phone_number
	if (phone.charAt(0) === '+') {
		phone = phone.replace(/[!@#$%^&*()_\-=\[\]{};':"\\|,.<>\/? /\s/g, '']/g, '')
	} else {
		phone = phone.replace(
			/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? /\s/g, '']/g,
			''
		)
		if (phone.charAt(0)) {
			phone = phone.replace(phone.substring(0, 1), '+84')
		}
	}
	return phone
}
