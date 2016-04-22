var canvas, ctx, VIDA = 3, ALTURA, LARGURA, frames = 0, maxPulos = 2, redimensionamento = 4, velocidadeLixo = 2, estadoAtual;
var margenX = 20;
var margenY = 40;

estados = {
	jogar: 0,
	jogando: 1,
	perdeu: 2
}

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

obstaculos = {
	_obs: [],
	cores: ["#ff0000", "#2E54FF", "#f6ff00", "#80ff00"],
	tempoInsere: 0,
	insere: function(){
		this._obs.push({
			x: 5+Math.floor(LARGURA*Math.random()),
			y: 0,
			largura: 10 + Math.floor(20*Math.random()),
			altura: 10 + Math.floor(30*Math.random()),
			cor: this.cores[Math.floor(4*Math.random())]
		});
		this.tempoInsere = 300 + Math.floor(200*Math.random());
	},
	atualiza: function(){
		if(this.tempoInsere == 0)
			this.insere();
		else
			this.tempoInsere--;
		for(var i = 0, tam = this._obs.length; i < tam; i++){
			var obs = this._obs[i];
			obs.y += velocidadeLixo;

			if (boneco.y + boneco.altura <= obs.y + obs.altura && boneco.y > obs.y + obs.altura && obs.x < boneco.x + boneco.largura && obs.x + obs.largura > boneco.x) {
				console.log('colisão');
				VIDA--;
				if(VIDA <= 0){
					estadoAtual = estados.perdeu;
				}
			}
			/*Condições de colisão
			1 - Y do boneco (MENOR) < que Y + altura do lixo
			2 - Y + altura >= y do lixo
			*/
			if (obs.y > ALTURA) {
				this._obs.splice(i, 1);
				tam--;
				i--;
			}
		}
	},
	desenha: function(){
		for (var i = 0, tam = this._obs.length; i < tam; i++) {
			var obs = this._obs[i];
			ctx.fillStyle = obs.cor;
			ctx.fillRect(obs.x, obs.y, obs.largura, obs.altura);
		};
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
		ctx.drawImage(img,this.cx,this.cy,33,50,this.x,this.y,this.largura,this.altura);
	}
}

function click(event){
	if (event.clientX > LARGURA / 2 - 50 && event.clientX < LARGURA / 2 + 50 && event.clientY > ALTURA / 2 - 50 && event.clientY < ALTURA / 2 + 50){
		estadoAtual = estados.jogando;
	}
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
	ALTURA -= margenY;
	LARGURA -= margenX;

	canvas = document.createElement("canvas");
	canvas.width = LARGURA;
	canvas.height = ALTURA;
	canvas.style.border = "1px solid #666";

	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
	document.addEventListener("mousedown", click);
	document.addEventListener("keydown", keydown);
	estadoAtual = estados.jogar;
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
	obstaculos.atualiza();
}

function desenha(){
	var img = new Image();
	img.src = "img/mountain_full_background1.png";
	//img.src = "img/cenario_3.gif";
	ctx.drawImage( img , 0, 0 , LARGURA , ALTURA);

	if (estadoAtual == estados.jogar) {
		ctx.fillStyle = "green";
		ctx.fillRect(LARGURA / 2 - 50, ALTURA / 2 - 50, 100, 100 );
		ctx.font = "20px Georgia";
		ctx.fillText = "Jogar";
	} else if(estadoAtual == estados.perdeu) {
		ctx.fillStyle = "red";
		ctx.fillRect(LARGURA / 2 - 50, ALTURA / 2 - 50, 100, 100 );
		ctx.font = "20px Georgia";
		ctx.fillText = "Game Over";
	} else if(estadoAtual == estados.jogando) {
		obstaculos.desenha();
		//ceu.desenha();
		//chao.desenha();
		boneco.desenha();
	}

}


main();