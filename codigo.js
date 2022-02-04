var pontuacao = 0
var direcao = ''
function pontuar() {
  var ponto = document.getElementById('marcador')
  pontuacao++
  ponto.textContent = pontuacao
}

window.onload = function () {
  var stage = document.getElementById('stage')
  var ctx = stage.getContext('2d')
  document.addEventListener('keydown', keyPush)
  setInterval(game, 80)

  const vel = 1

  var vx = (vy = 0)
  var px = 10
  var py = 15
  var tp = 15
  var qp = 20
  var ax = (ay = 15)

  var trail = []
  tail = 5

  function game() {
    px += vx
    py += vy
    if (px < 0) {
      px = qp - 1
    }
    if (px > qp - 1) {
      px = 0
    }
    if (py < 0) {
      py = qp - 1
    }
    if (py > qp - 1) {
      py = 0
    }

    ctx.fillStyle = 'gray'
    ctx.fillRect(0, 0, stage.width, stage.height)

    ctx.fillStyle = 'green'
    ctx.fillRect(ax * tp, ay * tp, tp, tp)

    ctx.fillStyle = 'blue'

    for (var i = 0; i < trail.length; i++) {
      ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1)
      if (trail[i].x == px && trail[i].y == py) {
        vx = vy = 0
        tail = 5
      }
    }

    trail.push({ x: px, y: py })
    while (trail.length > tail) {
      trail.shift()
    }

    if (ax == px && ay == py) {
      tail++
      ax = Math.floor(Math.random() * qp)
      ay = Math.floor(Math.random() * qp)
      pontuar()
    }
  }

  function keyPush(event) {
    switch (event.keyCode) {
      case 37: // Left
        if (direcao != 'right') {
          vx = -vel
          vy = 0
          direcao = 'left'
        }

        break
      case 38: // up
        if (direcao != 'down') {
          vx = 0
          vy = -vel
          direcao = 'up'
        }

        break
      case 39: // right
        if (direcao != 'left') {
          vx = vel
          vy = 0
          direcao = 'right'
        }

        break
      case 40: // down
        if (direcao != 'up') {
          vx = 0
          vy = vel
          direcao = 'down'
        }

        break
        defaut: break
    }
  }
}
