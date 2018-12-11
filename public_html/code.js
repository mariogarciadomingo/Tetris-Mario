var canvas = document.getElementById("espai");
var ctx = canvas.getContext("2d");
var vacio = document.getElementById("vacio");
var Piece = function (forma, color) {
	this.forma = forma;
	this.color = color;
	this.x = 3;
	this.y = 0;
};
Piece.prototype.rotarDreta = function () {
	var formaNova = new Array();
	for (var i = 0; i < this.forma.length; i++) {
		formaNova[i] = new Array();
		for (var j = 0; j < this.forma[i].length; j++) {
			formaNova[i][j] = this.forma[this.forma[i].length - 1 - j][i];
		}
	}
	this.forma = formaNova;
}
Piece.prototype.rotarEsquerra = function () {
	var formaNova = new Array();
	for (var i = 0; i < this.forma.length; i++) {
		formaNova[i] = new Array();
		for (var j = 0; j < this.forma[i].length; j++) {
			formaNova[i][j] = this.forma[j ][this.forma[i].length - 1 - i];
		}
	}
	this.forma = formaNova;
}

var joc = {
	color: 0,
	espai: [],
	puntuacio: 0,
	puntuacioMax: 0,
	Piece:new Piece(),
	nextPiece: [],
	comptador: [['groc', 0], ['lila', 0], ['verd', 0], ['roig', 0], ['blau', 0], ['taronga', 0], ['morat', 0]],
	interval: 1000,
	inicialitzar: function () {
		this.NewPiece();
		this.espai[0] = new Array(25);
		for (var i = 0; i < 25; i++) {
			this.espai[i] = new Array(10);
			for (var x = 0; x < 10; x++) {
				this.espai[i][x] = 0;
			}
		}
	},
	
	calcularSeguent: function () {
	},
	teclat: function () {
	},
	MostrarEspai: function () {
		for (var i = 0; i < 25; i++) {
			for (var x = 0; x < 10; x++) {
				if (this.espai[i][x] == 0)
					ctx.drawImage(vacio, x * 28, i * 28, 28, 28);
				else if (this.espai[i][x] <8)
					ctx.drawImage(groc, x * 28, i * 28, 28, 28);
			}
		}
	},
	BaixarPiece: function () {
		if(this.Piece.forma!=null){
		if(this.PotBaixar()){
		this.espai[this.Piece.y]=[0,0,0,0,0,0,0,0,0,0];
		this.Piece.y = this.Piece.y + 1;
		for (var i = 0; i < 4; i++) {
			for (var x = 0; x < 4; x++) {
				if (this.Piece.forma[i][x] == 1)
					this.espai[this.Piece.y + i][this.Piece.x + x] = this.color;
				else
				{
					this.espai[this.Piece.y + i][this.Piece.x + x] = 0;
				}
			}
		}
	}}
	},
	PotBaixar: function()
	{
		var pot = true;
		if(this.Piece.y+4<23)
		{
			for (var i = 0; i < 4; i++) {
					if (this.espai[this.Piece.y + i][this.Piece.x + 4]!=0)
					 pot = false;	
			}
		}
		
			return pot;
	},
	RandomPiece: function () {
		var peces = [
			[[[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]], "groc"],
			[[[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]], "lila"],
			[[[0, 0, 0, 0], [0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0]], "verd"],
			[[[0, 0, 0, 0], [0, 1, 1, 0], [0, 0, 1, 1], [0, 0, 0, 0]], "roig"],
			[[[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]], "blau"],
			[[[0, 1, 1, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]], "taronga"],
			[[[0, 0, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]], "morat"]]
		var numeroAleatori = Math.round(Math.random() * 6);
		return peces[numeroAleatori];
	},
	NewPiece: function () {
		if(this.Piece.color == null)
		{
			pa = this.RandomPiece();
			this.nextPiece = new Piece(pa[0], pa[1]);
		}
		this.Piece = this.nextPiece;
		pa = this.RandomPiece();
		this.nextPiece = new Piece(pa[0], pa[1]);
		if (this.Piece.color == "groc")
			this.color = 1;
		else if (this.Piece.color == "lila")
			this.color = 2;
		else if (this.Piece.color == "verd")
			this.color = 3;
		else if (this.Piece.color == "roig")
			this.color = 4;
		else if (this.Piece.color == "blau")
			this.color = 5;
		else if (this.Piece.color == "taronga")
			this.color = 6;
		else if (this.Piece.color == "morat")
			this.color = 7;
	}
};

joc.inicialitzar();

joc.NewPiece();
var interval = setInterval(function(){joc.BaixarPiece();joc.MostrarEspai();joc.Piece.rotarEsquerra();},1000);

document.getElementById("count").innerHTML = "SCORE : " + joc.Score;