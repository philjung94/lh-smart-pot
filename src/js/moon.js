const HAPPY      = 0
const DYING      = 1
const DEAD       = 2
const BEING_FED  = 3
const appContainer = document.querySelector('.app-container')

class Moonface {
	constructor() {
		this.face = document.querySelector('img')
		this.state = HAPPY
	}
	renderFace() {
		this.face.src = this.getFace(this.state)
	}
	getFace(index) {
		return [
			'/img/moon-happy.jpg',
			'/img/moon-sad.png',
			'/img/moon-dead.png',
			'/img/moon-being-fed.png'
		][index];
	}
	makeHappy() {
		this.state = HAPPY
		this.renderFace()
	}
	makeSad() {
		this.state = DYING
		this.renderFace()
	}
	makeDead() {
		this.state = DEAD
		this.renderFace()
	}
	approachDeath() {
		if (this.state >= DEAD) {
			this.state = HAPPY
		} else {
			this.state++
		}
		this.renderFace()
	}
	beingFed(){
		this.state = BEING_FED
		this.renderFace()
	}

}

export default Moonface

/** 
 * States: dead, dying, happy
 * 
 */
