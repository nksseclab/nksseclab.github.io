(() => {
	'use strict';
	const search = document.querySelector('#publication-search');
	const type = document.querySelector('#publication-type');
	const venue = document.querySelector('#publication-venue');
	const year = document.querySelector('#publication-year');
	const reset = document.querySelector('#publication-reset');
	const summary = document.querySelector('#publication-summary');
	const empty = document.querySelector('#publication-empty');
	const items = [...document.querySelectorAll('#publication-list .pub-item')];
	if (!search || !items.length) return;

	function filter() {
		const query = search.value.trim().toLowerCase();
		let shown = 0;
		items.forEach(item => {
			const visible = (!query || item.dataset.search.toLowerCase().includes(query)) &&
				(!type.value || item.dataset.type === type.value) &&
				(!venue.value || item.dataset.venue === venue.value) &&
				(!year.value || item.dataset.year === year.value);
			item.hidden = !visible;
			if (visible) shown++;
		});
		summary.textContent = `${shown} publication${shown === 1 ? '' : 's'}`;
		empty.hidden = shown !== 0;
	}

	[search, type, venue, year].forEach(control => control.addEventListener('input', filter));
	reset.addEventListener('click', () => { search.value = ''; type.value = ''; venue.value = ''; year.value = ''; filter(); search.focus(); });
})();
