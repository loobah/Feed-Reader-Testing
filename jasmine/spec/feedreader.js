/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {

	// Tests RSS feeds.
	describe('RSS Feeds', function() {

		// Checks if allFeeds exists and has content in it.
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		// Checks if URLs are found.
		it('url defined', function() {
			for(let feed of allFeeds) {
				expect(feed.url).toBeDefined();
				expect(feed.url.length).not.toBe(0);
			}
		});

		// Checks if Names are found.
		it('name defined', function() {
			for(let feed of allFeeds) {
				expect(feed.name).toBeDefined();
				expect(feed.name.length).not.toBe(0);
			}
		});
	});

	// Menu toggles and starts with menu-hidden class active.
	describe('The menu', function() {

		// Checks for the menu-hidden class!
		it('is hidden', function() {
			const body = document.querySelector('body');
			expect(body.classList.contains('menu-hidden')).toBe(true);
		})

		// Checks if menu is off and toggles on/off!
		it ('toggles on and off',function() {
			const body = document.querySelector('body');
			const menu = document.querySelector('.menu-icon-link');
			
			menu.click(); // click on menu
			// check menu should be visible when click on menu
			expect(body.classList.contains('menu-hidden')).toBe(false);

			menu.click(); // again click on menu
			// menu should be hidden when click on again
			expect(body.classList.contains('menu-hidden')).toBe(true);
		})
	});

	// Tests if feeds are loading to the page.
	describe('Initial Entries', function() {

		// "Done" handles "asynchronicity".
		beforeEach(function(done) {
			loadFeed(0, done);
		});

		it('Loads feed', function() {
			//Checks if there's more than one entry inside the feed.
			const checkEntries = $('.feed .entry').length;
			expect(checkEntries).toBeGreaterThan(0);
		});
	});

	// Tests if it loads new content.
	describe('New Feed Selection', function() {
		const feed = document.querySelector('.feed');
		const firstFeed = [];

		// Loads contents, relates to callback function.
		// Asynchronicity handling.
		beforeEach(function(done) {
			loadFeed(0, function() {
				Array.from(feed.children).forEach(function(entry) {
					firstFeed.push(entry.innerText);

					loadFeed(1, function(){
					done();
					});
				});
			});
		});

		// Checks 1st feed vs new.
		it('Content changes', function() {
			Array.from(feed.children).forEach(function(entry, index) {
			expect(entry.innerText === firstFeed[index]).toBe(false);
			});
		});
	});

});
