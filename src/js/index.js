import Moon from './moon'
import '../css/style.css'

document.addEventListener('DOMContentLoaded', function(){
	const moon = new Moon()
	moon.renderFace()
	setInterval(moon.approachDeath.bind(moon), 3000)
	setTimeout(moon.beingFed.bind(moon),4000)
})
