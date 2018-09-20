import FFObserver from 'fontfaceobserver';

export const postponeLoadFont = () => {
	new FFObserver('Fira Sans')
		.load()
		.then(() => {
			document.body.classList.add('font_loaded_yes');
		});
};
