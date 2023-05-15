export const copyToClickBoard = (textToCopy: string) => {
	const el = document.createElement('input')
	el.value = textToCopy
	document.body.appendChild(el)
	el.select()
	document.execCommand('copy')
	document.body.removeChild(el)

	return
}
