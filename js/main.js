var canvas, ctx, ALTURA, LARGURA, frames = 0, maxPulos = 2;
var margenX = 40;
var margenY = 20;

chao = {
	y: window.innerHeight - (50 + margenX),
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
	altura: 50,
	largura: 33,
	cor: "#A8A83E",
	border: 2,
	gravidade: 1.2,
	velocidade: 0,
	forcaDoPulo: 25,
	qntPulos: 0,

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
		if (this.x < window.innerWidth - (30 + margenX)) {
			this.x += 20;
		}
	},
	teleportRight: function(){
		this.x = window.innerWidth - (50 + margenX);
	},
	teleportLeft: function(){
		this.x = 20;
	},
	moveLeft: function(){
		if (this.x > 0) {
			this.x -= 20;
		}
	},
	moveDown: function(){
		this.altura = 30;
	},

	desenha: function(){
		var img = new Image();
		img.src = "img/spritexb-1574.png";
		ctx.drawImage( img , this.x, this.y, this.largura, this.altura);
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
			boneco.moveRight();
			break;
		case 65: //btn A
			boneco.moveLeft();
			break;
		case 83: //btn S
			//boneco.moveDown();
			break;
		case 32: //btn W
			boneco.pula();
			break;
		case 69: //btn E
			boneco.teleportRight();
			break;
		case 81: //btn Q
			boneco.teleportLeft();
			break;
		case 87: //btn espaço
			boneco.pula();
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
	ctx.drawImage( img , 0, 0 , LARGURA , ALTURA);
	//ctx.fillStyle = "#50beff";
	//ctx.fillRect(0, 0, LARGURA, ALTURA);
    //ctx.rect(0, 0, 150, 100);
    //ctx.fillStyle = pat;
    //ctx.fill();

	//ceu.desenha();
	//chao.desenha();
	boneco.desenha();
}

main();