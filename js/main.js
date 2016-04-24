var canvas, ctx, ALTURA, LARGURA, frames = 0, maxPulos = 2, redimensionamento = 4, velocidadeLixo = 2, insereLixo = 200, estadoAtual, SCORE = 0, VIDA = 5;
var margenX = 20;
var margenY = 40;
ALTURA = window.innerHeight;
LARGURA = window.innerWidth;
ALTURA -= margenY;
LARGURA -= margenX;

estados = {
	jogar: 0,
	jogando: 1,
	perdeu: 2
}

chao = {
	y: window.innerHeight - (50 + margenY),
	static_y: window.innerHeight - (50 + margenY),
	altura: 50,
	largura: 200,
	cor: "#FFFFFF",
	text: "SCORE: "+SCORE,
	desenha: function(){
		ctx.fillStyle = this.cor;
		ctx.font = "26px Comic Sans MS";
		ctx.strokeText(this.text, 20, ALTURA - 26);
		//ctx.fillRect(0, this.y, this.largura, this.altura);
	},

	atualiza: function(){
		this.text = "SCORE: "+SCORE;
	}
}

ceu = {
	y: 0,
	altura: 50,
	cor: "#FFFFFF",
	text: "VIDA: "+VIDA,
	desenha: function(){
		ctx.fillStyle = this.cor;
		ctx.font = "26px Comic Sans MS";
		ctx.strokeText(this.text, 20, this.y + 26);
	},

	atualiza: function(){
		this.text = "VIDA: "+VIDA;
	}
}

obstaculos = {
	//banaa, lata, papel, injeção, garrafa pet, jornal, rolo, maçã, garrafa vidro
	_obs: [],
	nome: ["banana", "lata", "papel", "injeção", "garrafa pet", "jornal", "rolo", "maçã", "garrafa vidro", "pilha"],
	cx: [0, 30, 50, 73, 98, 126, 188, 243, 268, 6],
	cy: [0, 0, 0, 0, 0, 0, 0, 0, 0, 27],
	altura: [27, 27, 27, 27, 50, 45, 45, 48, 50, 50],
	largura: [25, 19, 20, 23, 25, 59, 51, 26, 23, 22],
	tempoInsere: 0,
	insere: function(){
		var lixo = Math.floor(10*Math.random());
		console.log(this.nome[lixo]);
		this._obs.push({
			x: 20 + Math.floor((LARGURA-40)*Math.random()),
			y: 0,
			cx: this.cx[lixo],
			cy: this.cy[lixo],
			largura: this.largura[lixo],
			altura: this.altura[lixo],
			//cor: this.cores[Math.floor(4*Math.random())]
		});
		this.tempoInsere = insereLixo + Math.floor(100*Math.random());
	},
	atualiza: function(){
		if(this.tempoInsere == 0)
			this.insere();
		else
			this.tempoInsere--;
		for(var i = 0, tam = this._obs.length; i < tam; i++){
			var obs = this._obs[i];

			obs.y += velocidadeLixo; //queda do lixo.

			//COLISÃO
			if (boneco.y - boneco.altura <= obs.y && boneco.y >= obs.y - obs.altura && obs.x < boneco.x + boneco.largura && obs.x + obs.largura > boneco.x) {
				
				SCORE += 15;
				if (SCORE % 45 == 0) {
					insereLixo -= 30;
				}
				if (SCORE % 105 == 0) {
					velocidadeLixo += 1;
				}

				this._obs.splice(i, 1);
				tam--;
				i--;
			}

			if (obs.y > ALTURA) {
				VIDA--;
				if (VIDA <= 0) {estadoAtual = estados.jogar}
				this._obs.splice(i, 1);
				tam--;
				i--;
			}
		}
	},
	desenha: function(){
		for (var i = 0, tam = this._obs.length; i < tam; i++) {
			var obs = this._obs[i];
			var img = new Image();
			img.src = "img/lixos/lixo.png";
			ctx.drawImage(
				img,
				obs.cx,
				obs.cy,
				obs.largura,
				obs.altura,
				obs.x,
				obs.y,
				obs.largura*2,
				obs.altura*2
			);
				//ctx.fillStyle = obs.cor;
				//ctx.fillRect(obs.x, obs.y, obs.largura, obs.altura);
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
	vida: 3,
	cor: "#A8A83E",
	border: 2,
	gravidade: 1.2,
	velocidade: 0,
	forcaDoPulo: 25,
	qntPulos: 0,
	velocidadeMove: 20,

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
		ctx.drawImage(img,this.cx,this.cy,33,50,this.x,this.y,this.largura*2,this.altura*2);
	}
}

function click(event){
	
	boneco.pula();

	//if (event.clientX > LARGURA / 2 - 50 && event.clientX < LARGURA / 2 + 50 && event.clientY > ALTURA / 2 - 50 && event.clientY < ALTURA / 2 + 50){
	if (estadoAtual == estados.jogar) {
		location.reload();
	}
	//}
}
function keydown(event){
	console.log('e : '+event.which);
	if (event.which == 68) {boneco.moveRight();} //DIREITA - D
	if (event.which == 65) {boneco.moveLeft();} //ESQUERDA - E
	if (event.which == 83) {/*boneco.moveDown();*/} //BAIXO - S
	if (event.which == 32) {boneco.pula();} //PULA - espaço
	if (event.which == 69) {boneco.teleportRight();} //E
	if (event.which == 81) {boneco.teleportLeft();} //Q
	if (event.which == 87) {/*boneco.moveUp();*/} //CIMA - W
}

function main(){

	canvas = document.createElement("canvas");
	canvas.width = LARGURA;
	canvas.height = ALTURA;
	canvas.style.border = "1px solid #666";

	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
	document.addEventListener("mousedown", click);
	document.addEventListener("keydown", keydown);
	estadoAtual = estados.jogando;
	roda();
}

function roda(){
	//if(estadoAtual == estados.jogando) {
		atualiza();
	//}
	desenha();
	window.requestAnimationFrame(roda)
}

function atualiza(){
		frames++;
		boneco.atualiza();
		obstaculos.atualiza();
		chao.atualiza();
		ceu.atualiza();
}

function desenha(){
	var img = new Image();
	img.src = "img/mountain_full_background1.png";
	//img.src = "img/cenario_3.gif";
	ctx.drawImage( img , 0, 0 , LARGURA , ALTURA);

	if (estadoAtual == estados.jogar) {
		ctx.fillStyle = "green";
		ctx.font = "26px Comic Sans MS";
		ctx.strokeText("JOGAR NOVAMENTE", LARGURA/2 - 20, ALTURA/2 - 10);
	} else if(estadoAtual == estados.perdeu) {
	} else if(estadoAtual == estados.jogando) {
		obstaculos.desenha();
		ceu.desenha();
		chao.desenha();
		boneco.desenha();
	}

}


main();