function v_js_elementInViewport(el) {
	var top = el.offsetTop;
	var height = el.offsetHeight;
	while (el.offsetParent) {
		el = el.offsetParent;
		top += el.offsetTop;
	}
	return (
		top < (window.pageYOffset + window.innerHeight) &&
		(top + height) > window.pageYOffset
	);
}
var v_js_targets = document.getElementsByClassName('j-animate')

function v_js_check() {
	for (var i = v_js_targets.length - 1; i >= 0; i--) {
		if (v_js_elementInViewport(v_js_targets[i]))
			v_js_targets[i].classList.add('j-animated')
	}
}
window.addEventListener( "scroll" , v_js_check )
console.log(document)
console.log(document.addEventListener)
document.addEventListener( "DOMContentLoaded" , v_js_check )

/*lazyload code ahead*/

;(() => {
	const images = Array.from(document.getElementsByClassName('lazy-load'))
	const check = e => {
		images.forEach((img, i) => {
			if (v_js_elementInViewport(img)) {
				img.src = img.getAttribute('data-src')
				images.splice(i, 1)
			}
		})
	}
	window.addEventListener('scroll', check)
	check()
})()

/*slider code ahead*/

document.addEventListener("DOMContentLoaded", event => {
	let sections = Array.from(
		document.getElementsByClassName('cards') || []
	)
	const aproxx = n => {
		while (n % 3 === 0) {
			n++
		}
		return n
	}
	sections.forEach(s => {
		const aproxx = n => {
			if (Math.floor(n) === n) {
				return n
			} else {
				return Math.floor(n) + 1
			}
		}
		let current = 0,
			sons = s.querySelectorAll('.twister-div').length,
			cantSons = innerWidth < 750 ? sons : aproxx(sons / 3),
			active = false
		s.style.width = (innerWidth < 750 ? sons : aproxx(sons) / 3) * 100 + 'vw'
		s.parentElement.addEventListener('mouseenter', () => {
			active = true
		})
		s.parentElement.addEventListener('mouseleave', () => {
			active = false
		})
		const next = (e = '') => {
			if (active && e !== 'A')
				return
			s.style.left = `-${current*100}vw`
			current = (current + 1) % cantSons
			}
		const prev = (e = '') => {
			if (active && e !== 'A')
				return
			if (current > 0) {
				s.style.left = `-${(current-2)*100}vw`
				current = (current - 1) % cantSons
			}
		}
		setInterval(next, 1000)
		s.parentElement.querySelector('.la').addEventListener('click', () => prev('A'))
		s.parentElement.querySelector('.ra').addEventListener('click', () => next('A'))
		window.addEventListener('resize', e => {
			current = 0
			s.style.left = `0vw`
			if (innerWidth < 750) {
				cantSons = s.querySelectorAll('.twister-div').length
			} else {
				cantSons = aproxx(sons / 3)
			}
		})
	})
})

/*weird slider ahead*/

;(()=>{
	const pointers = document.querySelectorAll('#shortcuts span'),
		services = document.getElementById('services')
	for (var i = pointers.length - 1; i >= 0; i--) {
		let index = i
		pointers[i].addEventListener('click',e=>{
			services.style.left = `-${index*100}vw`
		})
	}
})()