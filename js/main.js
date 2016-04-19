var canvas, ctx, ALTURA, LARGURA, frames = 0, maxPulos = 2, redimensionamento = 4;
var margenX = 40;
var margenY = 20;

chao = {
	y: window.innerHeight - (50 + margenY),
	static_y: window.innerHeight - (50 + margenY),
	altura: 50,
	cor: "#96CC50",

	desenha: function(){
		ctx.fillStyle = this.cor;
		ctx.fillRect(0, this.y, LARGURA, this.altura);
	}
}
ceu = {
	y: 0,
	altura: 50,
	cor: "#3E3EA8",

	desenha: function(){
		ctx.fillStyle = this.cor;
		ctx.fillRect(0, this.y, LARGURA, this.altura);
	}

}
boneco = {
	x: 50,
	y: 0,
	cx: 0,
	cy: 0,
	altura: 50,
	largura: 33,
	cor: "#A8A83E",
	border: 2,
	gravidade: 1.2,
	velocidade: 0,
	forcaDoPulo: 25,
	qntPulos: 0,
	velocidadeMove: 12,

	atualiza: function(){
		this.velocidade += this.gravidade;
		this.y += this.velocidade;

		if(this.y > chao.y - this.altura){
			this.y = chao.y - this.altura;
			this.qntPulos = 0;
		}
	},

	pula: function(){
		if (this.qntPulos < maxPulos){
			this.velocidade = - this.forcaDoPulo;
			this.qntPulos++;
		}
	},

	moveRight: function(){
		switch (this.cx) {
			case 0:
				this.cx = 33;
				this.cy = 98;
				break;
			case 33:
				this.cx = 66;
				this.cy = 98;
				break;
			case 66:
				this.cx = 99;
				this.cy = 98;
				break;
			case 99:
				this.cx = 0;
				this.cy = 98;
				break;
			default:
				this.cx = 0;
				this.cy = 0;
				break;
		}
		if (this.x < window.innerWidth - (30 + margenX)) {
			this.x += this.velocidadeMove;
		}
	},
	teleportRight: function(){
		this.x = window.innerWidth - (50 + margenX);
	},
	teleportLeft: function(){
		this.x = 20;
	},
	moveLeft: function(){
		switch (this.cx) {
			case 0:
				this.cx = 33;
				this.cy = 49;
				break;
			case 33:
				this.cx = 66;
				this.cy = 49;
				break;
			case 66:
				this.cx = 99;
				this.cy = 49;
				break;
			case 99:
				this.cx = 0;
				this.cy = 49;
				break;
			default:
				this.cx = 0;
				this.cy = 0;
				break;
		}
		if (this.x > 0) {
			this.x -= this.velocidadeMove;
		}
	},
	moveDown: function(){
		if(this.altura < 62){
			this.largura += redimensionamento;
			this.altura += redimensionamento;
		}
		if (chao.y < chao.static_y + 12){
			chao.y += redimensionamento;
		}
		switch (this.cx) {
			case 0:
				this.cx = 33;
				this.cy = 0;
				break;
			case 33:
				this.cx = 66;
				this.cy = 0;
				break;
			case 66:
				this.cx = 99;
				this.cy = 0;
				break;
			case 99:
				this.cx = 0;
				this.cy = 0;
				break;
			default:
				this.cx = 0;
				this.cy = 0;
				break;
		}
	},
	moveUp: function(){
		if(this.altura > 38){
			this.largura -= redimensionamento;
			this.altura -= redimensionamento;
		}
		if (chao.y > chao.static_y - 12){
			chao.y -= redimensionamento;
		}
		switch (this.cx) {
			case 0:
				this.cx = 33;
				this.cy = 148;
				break;
			case 33:
				this.cx = 66;
				this.cy = 148;
				break;
			case 66:
				this.cx = 99;
				this.cy = 148;
				break;
			case 99:
				this.cx = 0;
				this.cy = 148;
				break;
			default:
				this.cx = 0;
				this.cy = 0;
				break;
		}
	},

	desenha: function(){
		var img = new Image();
		img.src = "img/spritexb-1869.png";
		ctx.drawImage(
			img,
			this.cx,
			this.cy,
			33,
			50,
			this.x,
			this.y,
			this.largura,
			this.altura
		);
		//ctx.fillStyle = this.cor;
		//ctx.fillStyle = this.border;
		//ctx.fillRect(this.x, this.y, this.largura, this.altura);
	}
}

function click(event){
	boneco.pula();
}
function keydown(event){
	console.log('e : '+event.which);
	switch (event.which) {
		case 68: //btn D
			boneco.desenha(33,99);
			boneco.moveRight();
			break;
		case 65: //btn A
			boneco.moveLeft();
			break;
		case 83: //btn S
			boneco.moveDown();
			break;
		case 32: //btn espaço
			boneco.pula();
			break;
		case 69: //btn E
			boneco.teleportRight();
			break;
		case 81: //btn Q
			boneco.teleportLeft();
			break;
		case 87: //btn w
			boneco.moveUp();
			break;
		default:
			// statements_def
			break;
	}
}

function main(){

	ALTURA = window.innerHeight;
	LARGURA = window.innerWidth;
	ALTURA -= margenX;
	LARGURA -= margenY;

	canvas = document.createElement("canvas");
	canvas.width = LARGURA;
	canvas.height = ALTURA;
	canvas.style.border = "1px solid #666";

	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
	document.addEventListener("mousedown", click);
	document.addEventListener("keydown", keydown);
	roda();
}

function sprite (options) {

    var that = {}, frameIndex = 0, tickCount = 0, ticksPerFrame = ticksPerFrame || 0, numberOfFrames = options.numberOfFrames || 1;

    that.loop = options.loop;
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    that.render = function () {

    	// Clear the canvas
    	context.clearRect(0, 0, that.width, that.height);

        // Draw the animation
        that.context.drawImage(
           that.image,
           frameIndex * that.width / numberOfFrames,
           0,
           that.width / numberOfFrames,
           that.height,
           0,
           0,
           that.width / numberOfFrames,
           that.height);
    };
    that.update = function () {

        tickCount += 1;

        if (tickCount > ticksPerFrame) {

        	 tickCount = 0;

            // If the current frame index is in range
            if (frameIndex < numberOfFrames - 1) {
                // Go to the next frame
                frameIndex += 1;
            } else if (that.loop) {
                frameIndex = 0;
            }
        }
    };

    return that;
}

function roda(){
	atualiza();
	desenha();

	window.requestAnimationFrame(roda)
}

function atualiza(){
	frames++;
	boneco.atualiza();
}

function desenha(){
	var img = new Image();
	img.src = "img/mountain_full_background1.png";
	//img.src = "img/cenario_3.gif";
	ctx.drawImage( img , 0, 0 , LARGURA , ALTURA);
	//Math.random()

	//ceu.desenha();
	//chao.desenha();
	boneco.desenha();
}

main();