class Main {
	constructor() {
		this.DEBUGGING = true
		this.checks()
	}

	checks() {
		if (!$) {
			throw new Error('No Jquery Installed')
		}
	}

	ui() {

	}

	bindEvents() {
	}

	gmap(apiKey, address) {
		// random callbackhell just because I'm lazy.
		$.getScript('/js/gmaps.min.js', () => {
			$.getScript("https://maps.googleapis.com/maps/api/js?key=" + apiKey, () => {
				//	INIT DOM ELEMENT
				let map = new GMaps({
					el: $('body').find('#map')[0],
					lat: 0,
					lng: 0
				})
				//	CHANGE LOCATION
				GMaps.geocode({
					address: address,
					callback: function(results, status) {
						if (status == 'OK') {
							let latlng = results[0].geometry.location
							map.setCenter(latlng.lat(), latlng.lng())
							map.addMarker({
								lat: latlng.lat(),
								lng: latlng.lng()
							})
						}
					}
				})
			})
		})
	}

	init() {
		$(document).foundation()
		this.ui()
		this.bindEvents()
	}
}

window.addEventListener('load', () => {
	const Website = new Main()
	Website.init()
	window.Website = Website
})
