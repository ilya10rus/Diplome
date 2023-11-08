export const sanitizeContent = (content) =>
	content
		.replaceAll('&nbsp', ' ')
		.replace(/ +/, ' ')
		.replaceAll('<div><br/></div>', '\n')
		.replaceAll('<div>', '\n')
		.replaceAll('<br></div>', '')
		.replaceAll('<div/>', ' ')
		.replaceAll(';</div>', ' ');
