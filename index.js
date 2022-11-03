const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.heigth = innerHeight

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
    constructor() {
        this.position = {
        x: 200,
        y: 80
    }

    this.width = 200
    this.height = 20
    }

    draw() {
        c.fillStyle = 'green'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player()
const plataform = new Plataform

const keys = {
   right: {
     pressed: false  
   },
   left: {
     pressed: false
   }
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    plataform.draw()

    if (keys.right.pressed) 
    player.velocity.x = 5; 
    else if (keys.left.pressed) 
    player.velocity.x = -5;
    else player.velocity.x = 0

    
    if (
        player.position.y + player.height <= plataform.position.y &&
        player.position.y + player.height + player.velocity.y >= 
        plataform.position.y &&
        player.position.x + player.width >= plataform.position.x && 
        player.position.x <= plataform.position.x + plataform.width
    )
    player.velocity.y = 0;
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