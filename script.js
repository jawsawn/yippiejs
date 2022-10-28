function onLoad() {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const img = new Image();
    img.src = 'tbh.png';
    img.onload = () => { ctx.drawImage(img, canvas.width / 2 - 500 / 2, canvas.height / 2 - 500 / 2) }
}

function random(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
}

function rng(from, to) {
    let rngSet = []
    for (let index = from; index < to + 1; index++) {
        rngSet.push({ number: index, count: 0 })
    }
    console.log(rngSet)

    for (let index = 0; index < 100; index++) {
        rngSet[random(from, to)].count++;
    }
    console.log(rngSet)
}

function animation() {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor() {
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
            this.size = 8;
            this.vx = (Math.random() * 10 + 10) * (Math.random() * 2 - 1);
            this.vy = (Math.random() * 10 + 10) * (Math.random() * 2 - 1);
            this.color = Math.floor(Math.random() * 16777215).toString(16);
            this.veltime = 50;
        }
        draw(context) {
            context.fillStyle = "#" + this.color;
            context.fillRect(this.x, this.y, this.size, this.size)
        }
        update() {
            if (this.veltime-- > 0) {
                this.y += this.vy;
                this.x += this.vx;
            }

            else
                this.y += 5;
        }
    }

    class Effect {
        constructor(width, height, amount) {
            this.width = width;
            this.height = height;
            this.amount = amount;
            this.particlesArray = [];
            this.init();
            this.vanishtime = 100;
        }
        init() {
            for (let index = 0; index < this.amount; index++) {
                this.particlesArray.push(new Particle());
            }
        }
        draw(context) {
            this.particlesArray.forEach(e => e.draw(context))
        }
        update() {
            this.particlesArray.forEach(e => e.update())
        }
    }
    const img = new Image();
    img.src = 'tbh.png';

    let globalID;
    function animate() {
        cancelAnimationFrame(globalID)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, canvas.width / 2 - 500 / 2, canvas.height / 2 - 500 / 2);
        effect.draw(ctx);
        effect.update();
        globalID = requestAnimationFrame(animate);
    }

    const effect = new Effect(canvas.width, canvas.height, 1000);
    animate();
    setTimeout(() => { cancelAnimationFrame(globalID) }, 4000);
}

function yippie() {
    new Audio('yippie.mp3').play();
    animation();


}
