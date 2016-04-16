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
	largura: 50,
	cor: "#A8A83E",
	border: 2,
	gravidade: 1.5,
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

	desenha: function(){
		ctx.fillStyle = this.cor;
		ctx.fillStyle = this.border;
		ctx.fillRect(this.x, this.y, this.largura, this.altura);
	}
}

function click(event){
	boneco.pula();
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
	ctx.fillStyle = "#50beff";
	ctx.fillRect(0, 0, LARGURA, ALTURA);

	chao.desenha();
	boneco.desenha();
}

main();