$(document).ready(function(){
	$('#menu-toggle').click(function(){
		$(this).toggleClass('open');
	});
});


document.addEventListener('DOMContentLoaded', () => {
	const select = document.getElementById('sortSelect');
	if (!select) return;

	const params = new URLSearchParams(window.location.search);
	const currentSort = params.get('sort') || 'nieuw-oud';
	select.value = currentSort;

	select.addEventListener('change', (e) => {
		const params = new URLSearchParams(window.location.search);
		params.set('sort', e.target.value);
		window.location.search = params.toString();
	});
});