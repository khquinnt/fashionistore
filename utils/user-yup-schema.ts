import { Translate } from 'next-translate'
import * as yup from 'yup'

const REGEX = {
	NAME: /[`!@#$%^&*()+=\[\]{};_.:"\\|,<>\/?~]/,
	PASSWORD: /[!@#_.\-`$%^&*()+=\[\]{};':"\\|,<>\/?~]/,
	SPACE_AT_START_END: /^\s+|\s+$/g,
	NON_ASCII: /[^\u0000-\u007F]+/,
	CHARACTER: /[a-zA-Z]/,
	NUMBER: /[0-9]/,
	PHONE_NUMBER: /(84|0[3|5|7|8|9])+([0-9]{8})\b/
}

export const firstNameSchemaFactory = (t: Translate) => {
	return yup
		.string()
		.required(t('firstname-required'))
		.min(2, t('user:min-max-first-name'))
		.max(30, t('user:min-max-first-name'))
		.transform((value) => {
			return value.replace(/\s+/g, ' ').trim()
		})
		.test(
			'Cannot have special character',
			t('user:cannot-have-special-character'),
			(value) => {
				return !value?.match(REGEX.NAME)
			}
		)
}

export const lastNameSchemaFactory = (t: Translate) => {
	return yup
		.string()
		.required(t('lastname-required'))
		.min(2, t('user:min-max-last-name'))
		.max(30, t('user:min-max-last-name'))
		.transform((value) => {
			return value.replace(/\s+/g, ' ').trim()
		})
		.test(
			'Cannot have special character',
			t('user:cannot-have-special-character'),
			(value) => {
				return !value?.match(REGEX.NAME)
			}
		)
}

export const passwordSchemaFactory = (t: Translate) => {
	return yup
		.string()
		.required(t('user:password-required'))
		.min(8, t('user:password-rule'))
		.max(40, t('user:password-rule'))
		.test(
			'Have space at start/end',
			t('user:password-cannot-have-space'),
			(value) => !value?.match(REGEX.SPACE_AT_START_END) && !value?.match(/[ ]/)
		)
		.test(
			'Password rule',
			t('user:password-rule'),
			(value) =>
				!value?.match(REGEX.NON_ASCII) && !!value?.match(REGEX.CHARACTER)
		)
		.matches(REGEX.NUMBER, t('user:password-rule'))
		.matches(REGEX.PASSWORD, t('user:password-rule'))
}

export const phoneSchemaFactory = (t: Translate) => {
	return yup
		.string()
		.required(t('user:phone-required'))
		.test('Invalid phone', t('user:phone-invalid'), (value) => {
			if (value?.includes('+84')) value = `0${value.slice(3)}`
			return !!value?.replaceAll('-', '')?.match(REGEX.PHONE_NUMBER)
		})
}
