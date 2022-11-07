let canvas;
let ctx;
let img;
let gid = null;

function onLoad() {
    canvas = document.getElementById("canvas1");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    img = new Image();
    img.src = 'tbh.png';
    img.onload = () => { ctx.drawImage(img, canvas.width / 2 - img.width / 2, canvas.height / 2 - img.height / 2) }
}

function animation(special_color = "50%") {
    class Particle {
        constructor() {
            this.x = canvas.width / 2;
            this.y = canvas.height / 2 - 150;
            this.size = 8;
            this.vx = (Math.random() * 10 + 10) * (Math.random() * 2 - 1);
            this.vy = (Math.random() * 10 + 10) * (Math.random() * 2 - 1);
            this.color = Math.floor(Math.random() * 360);

        }
        draw(context) {
            if(this.y > canvas.height ) {
                return;
            }
            context.fillStyle = `hsl(${this.color}, 100%, ${special_color})`;
            context.fillRect(this.x, this.y, this.size, this.size);
        }
        update() {
            this.y += this.vy;
            this.x += this.vx;
            this.vy += 0.5;
        }
    }

    class Effect {
        constructor(width, height, amount) {
            this.width = width;
            this.height = height;
            this.amount = amount;
            this.particlesArray = [];
            this.init();
        }
        init() {
            for (let index = 0; index < this.amount; index++) {
                this.particlesArray.push(new Particle());
            }
        }
        draw(context) {
            let limit = 0;
            this.particlesArray.forEach(e => e.draw(context))
            this.particlesArray.forEach(e => e.y > canvas.height ? limit++ : limit--)
            if(limit == this.amount)
                cancelAnimationFrame(gid)
        }
        update() {
            this.particlesArray.forEach(e => e.update())
        }
    }


    function animate() {
        gid = requestAnimationFrame(animate)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if(special_color == "50%")
            ctx.drawImage(img, canvas.width / 2 - img.width / 2, canvas.height / 2 - img.height / 2);
        effect.draw(ctx);
        effect.update();
    }

    const effect = new Effect(canvas.width, canvas.height, 1000);
    animate();
}

function yippie() {
    new Audio('yippie.mp3').play();
    if(gid) {
        cancelAnimationFrame(gid);
        gid = null;
    }
    animation();
}

function yippie_break() {
    new Audio('yippie_break.mp3').play();
    if(gid) {
        cancelAnimationFrame(gid);
        gid = null;
    }
    animation("0%");
}