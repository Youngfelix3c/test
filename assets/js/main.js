/*
	Eventually by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/


(function () {

	"use strict";

	var $body = document.querySelector('body');

	// Methods/polyfills.

	// classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
	!function () { function t(t) { this.el = t; for (var n = t.className.replace(/^\s+|\s+$/g, "").split(/\s+/), i = 0; i < n.length; i++)e.call(this, n[i]) } function n(t, n, i) { Object.defineProperty ? Object.defineProperty(t, n, { get: i }) : t.__defineGetter__(n, i) } if (!("undefined" == typeof window.Element || "classList" in document.documentElement)) { var i = Array.prototype, e = i.push, s = i.splice, o = i.join; t.prototype = { add: function (t) { this.contains(t) || (e.call(this, t), this.el.className = this.toString()) }, contains: function (t) { return -1 != this.el.className.indexOf(t) }, item: function (t) { return this[t] || null }, remove: function (t) { if (this.contains(t)) { for (var n = 0; n < this.length && this[n] != t; n++); s.call(this, n, 1), this.el.className = this.toString() } }, toString: function () { return o.call(this, " ") }, toggle: function (t) { return this.contains(t) ? this.remove(t) : this.add(t), this.contains(t) } }, window.DOMTokenList = t, n(Element.prototype, "classList", function () { return new t(this) }) } }();

	// canUse
	window.canUse = function (p) { if (!window._canUse) window._canUse = document.createElement("div"); var e = window._canUse.style, up = p.charAt(0).toUpperCase() + p.slice(1); return p in e || "Moz" + up in e || "Webkit" + up in e || "O" + up in e || "ms" + up in e };

	// window.addEventListener
	(function () { if ("addEventListener" in window) return; window.addEventListener = function (type, f) { window.attachEvent("on" + type, f) } })();

	// Play initial animations on page load.
	window.addEventListener('load', function () {
		window.setTimeout(function () {
			$body.classList.remove('is-preload');
		}, 100);
	});

	// Slideshow Background.
	(function () {

		// Settings.
		var settings = {

			// Images (in the format of 'url': 'alignment').
			images: {
				'images/GRW.jpg': 'center',
				'images/division2.png': 'center',
				'images/watchdogs2.png': 'center',
				'images/hitman3.jpg': 'center',
				'images/GTA5.jpg': 'center',
				'images/r6-heroBanner.jpg': 'center',
				'images/ac-valhallar.webp': 'center'
			},

			// Delay.
			delay: 6000

		};

		// Vars.
		var pos = 0, lastPos = 0,
			$wrapper, $bgs = [], $bg,
			k, v;

		// Create BG wrapper, BGs.
		$wrapper = document.createElement('div');
		$wrapper.id = 'bg';
		$body.appendChild($wrapper);

		for (k in settings.images) {

			// Create BG.
			$bg = document.createElement('div');
			$bg.style.backgroundImage = 'url("' + k + '")';
			$bg.style.backgroundPosition = settings.images[k];
			$wrapper.appendChild($bg);

			// Add it to array.
			$bgs.push($bg);

		}

		// Main loop.
		$bgs[pos].classList.add('visible');
		$bgs[pos].classList.add('top');

		// Bail if we only have a single BG or the client doesn't support transitions.
		if ($bgs.length == 1
			|| !canUse('transition'))
			return;

		window.setInterval(function () {

			lastPos = pos;
			pos++;

			// Wrap to beginning if necessary.
			if (pos >= $bgs.length)
				pos = 0;

			// Swap top images.
			$bgs[lastPos].classList.remove('top');
			$bgs[pos].classList.add('visible');
			$bgs[pos].classList.add('top');

			// Hide last image after a short delay.
			window.setTimeout(function () {
				$bgs[lastPos].classList.remove('visible');
			}, settings.delay / 2);

		}, settings.delay);

	})();

	// Signup Form.
	(function () {

		// Vars.
		var $form = document.querySelectorAll('#signup-form')[0],
			$submit = document.querySelectorAll('#signup-form input[type="submit"]')[0],
			$message;

		// Bail if addEventListener isn't supported.
		if (!('addEventListener' in $form))
			return;

		// Message.
		$message = document.createElement('span');
		$message.classList.add('message');
		$form.appendChild($message);

		$message._show = function (type, text) {

			$message.innerHTML = text;
			$message.classList.add(type);
			$message.classList.add('visible');

			window.setTimeout(function () {
				$message._hide();
			}, 3000);

		};

		$message._hide = function () {
			$message.classList.remove('visible');
		};

		// Events.
		// Note: If you're *not* using AJAX, get rid of this event listener.
		$form.addEventListener('submit', function (event) {

			event.stopPropagation();
			event.preventDefault();

			// Hide message.
			$message._hide();

			// Disable submit.
			$submit.disabled = true;

			// Process form.
			// Note: Doesn't actually do anything yet (other than report back with a "thank you"),
			// but there's enough here to piece together a working AJAX submission call that does.
			window.setTimeout(function () {


				// 测试用------------------------------------------------------------------------------------------------------

				// 获取用户名和密码
				var username = document.querySelectorAll('#signup-form input[name="username"]')[0].value,
					password = document.querySelectorAll('#signup-form input[name="password"]')[0].value;

				// 减少重复代码，打包执行效果	
				function resetForm($form, $submit, disabled) {
					$form.reset();
					$submit.disabled = disabled;
				}
				resetForm($form, $submit, false); // 清除表单并执行失败效果
				resetForm($form, $submit, true); // 清除表单并执行成功效果


				// 测试用账号组
				var allTestUser = {
					"admin123": "123456",
					"felix3c": "felix123",
					"youngfelix": "a6666111",
					"testuser01": "fuckyou123",//因为不判断密码里的非法词汇，所以这个账号与密码是有效的
					
					//下面为带有非法名称的账号

					"fuckyou123": "fuck123",
					"shit123": "121233",
					"bitch33": "shit123",
				};

				//非法词汇组
				var illegalWords = [
					"fuck",
					"bitch",
					"shit",
				];

				var joinLink = document.getElementById('to-register');//获取元素
				//var visitorLink = document.getElementById('visitor');//获取元素

				//先判断测试用户名里是否存在非法词汇
				if (illegalWords.some(function (word) {
					return username.toLowerCase().includes(word);
				})) {

					resetForm($form, $submit, false);

					$message._show('failure', '用户名包含非法词汇，请重试');
					return;//结束函数，不再判断下面的if

					//上面的非法字段验证通过后来到用账号密码验证 用trim方法去掉空格后再判断是否为空
				} else if (allTestUser[username] === password && username.trim() !== '' && password.trim() !== '') {

					resetForm($form, $submit, true);

					// Show message. 成功信息
					$message._show('success', '验证成功!');

					document.title = 'YoungFelix3c game blog';
					document.querySelector('h1').textContent = '欢迎回来，' + username + ' !';

					//隐藏不需要的表单
					$form.style.display = 'none';
					joinLink.style.display = 'none'; 
					//visitorLink.style.display = 'none'; 

					document.querySelector('p').textContent = '您已成功登录,测试结束,感谢您的配合！';

				} else {
					resetForm($form, $submit, false);
					$message._show('failure', '用户名或密码错误，请重试');//失败信息
				}

				// 测试用------------------------------------------------------------------------------------------------------

			}, 750);

		});

	})();

})();

