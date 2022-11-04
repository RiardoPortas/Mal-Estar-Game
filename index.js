import plataform from '../imagens/Platform_C.png'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 0.5

class Player {
    constructor() {
        this.position = {
            x: 30,
            y: 30
        }
        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = 30
        this.height = 30
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
  
  update() {
     this.draw()  
     this.position.x += this.velocity.x
     this.position.y += this.velocity.y

     if (this.position.y + this.height + this.velocity.y <= canvas.height)
     this.velocity.y += gravity
     else this.velocity.y = 0
    }
} 

class Plataform {
    constructor({ x, y, image}) {
        this.position = {
        x,
        y
    }

    this.width = 200
    this.height = 20

    this.image = image
    }

    draw() {
       c.drawImage(this.image, this.position.x, this.position.y)
    }
}

const image= new Image()
image.src = plataform

const player = new Player()
const plataforms = 
[new Plataform({
    x: 200, 
    y:500,
    image
  }), 
new Plataform({
    x:500, 
    y:80,
    image
})]

const keys = {
   right: {
     pressed: false  
   },
   left: {
     pressed: false
   }
}

let scrollOffset = 0

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    plataforms.forEach(plataform => {
    plataform.draw()
    })

    if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5 
    } else if (keys.left.pressed && player.position.x > 100) { 
    player.velocity.x = -5
    } else { 
      player.velocity.x = 0

      if (keys.right.pressed) {
        scrollOffset += 5
        plataforms.forEach((plataform) => {
            plataform.position.x -= 5
        })
    } else if (keys.left.pressed) {
        scrollOffset -= 5

      plataforms.forEach((plataform) => {
        plataform.position.x += 5
      })
    }
}

console.log(scrollOffset)

    plataforms.forEach((plataform) => {
    if (
        player.position.y + player.height <= plataform.position.y &&
        player.position.y + player.height + player.velocity.y >= 
        plataform.position.y &&
        player.position.x + player.width >= plataform.position.x && 
        player.position.x <= plataform.position.x + plataform.width
    ) {
    player.velocity.y = 0
    } 
  })
    if (scrollOffset > 2000) {
        console.log ('you win')
    }
}

animate()

document.addEventListener('keydown', (keycode) => {
    console.log(event.key)
    switch (event.key){
        case 'a':
            console.log('left')
            keys.left.pressed = true
            break

        case 's':
            console.log('down')
            break

        case 'd':
            console.log('right')
            keys.right.pressed = true
            break

        case 'w':
            console.log('up')
            player.velocity.y -= 5
            break
    }

    console.log(keys.right.pressed)
})

document.addEventListener('keyup', (keycode) => {
    console.log(event.key)
    switch (event.key){
        case 'a':
            console.log('left')
            keys.left.pressed = false
            break

        case 's':
            console.log('down')
            break

        case 'd':
            console.log('right')
            keys.right.pressed = false
            break

        case 'w':
            console.log('up')
            player.velocity.y -= 5
            break
    }
})

