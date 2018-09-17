const immediatelyExecuteCommand = (method, ...args) => {
	yaCounter[method](...args);
};

const deferExecuteCommand = (trackingId, ...args) => {
	document.addEventListener(`yacounter${trackingId}inited`, () => {
		immediatelyExecuteCommand(...args);
	});
};

export const executeCommand = (trackindId, method, ...args) => {
	if (typeof window === 'undefined') {
		return;
	}

	if (typeof window.yaCounter === 'undefined') {
		deferExecuteCommand(trackindId, method, ...args);
		return;
	}

	immediatelyExecuteCommand(method, ...args);
};