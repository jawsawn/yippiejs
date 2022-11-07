let canvas;
let ctx;
let img;
let gid = null;
const audio1 = new Audio('yippie.mp3');
const audio2 = new Audio('yippie_break.mp3');

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
            if (this.y > canvas.height) return;
            context.fillStyle = `hsl(${this.color}, 100%, ${special_color})`;
            context.fillRect(this.x, this.y, this.size, this.size);
            this.update();
        }

        update() {
            this.y += this.vy;
            this.x += this.vx;
            this.vy += 0.5;
        }
    }

    const particle_amount = 1000;
    let particlesArray = [];

    for (let index = 0; index < particle_amount; index++)
        particlesArray.push(new Particle());

    function AnimateParticle(context) {
        particlesArray.forEach(e => e.y < canvas.height ? e.draw(context) : particlesArray.splice(particlesArray.indexOf(e), 1))
        if (particlesArray.length == 0) cancelAnimationFrame(gid)
    }

    function animate() {
        //Make sure requestAnimationFrame is on top or else it cannot be canceled
        gid = requestAnimationFrame(animate)

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if (special_color == "50%") ctx.drawImage(img, canvas.width / 2 - img.width / 2, canvas.height / 2 - img.height / 2);
        AnimateParticle(ctx);
    }

    animate();
}

function yippie() {
    audio1.play();
    cancelAnimationFrame(gid);
    animation();
}

function yippie_break() {
    audio2.play();
    cancelAnimationFrame(gid);
    animation("0%");
}