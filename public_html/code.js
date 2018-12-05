var canvas = document.getElementById("espai");
var ctx = canvas.getContext("2d");
var vacio =  document.getElementById("vacio");
var joc = {
 
	espai: [],
	puntuacio: 0,
	puntuacioMax: 0,
	piece: [],
	comptador: [['i', 0], ['j', 0], ['l', 0], ['o', 0], ['s', 0], ['t', 0], ['z', 0]],
	edat: 40,
	interval: 1000,
	inicialitzar: function () {
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
	MostrarEspai: function () 
	{
		for (var i = 0; i < 25; i++) {
			for (var x = 0; x < 10; x++) {
				if (this.espai[i][x] == 0) {
					ctx.drawImage(vacio, x * 28, i * 28, 28, 28);
				}
			}
		}
	},
	BaixarPiece: function()
	{

	},
	RandomPiece: function()
	{

	}
	
}; 
joc.inicialitzar();
joc.MostrarEspai();
document.getElementById("count").innerHTML ="SCORE : "+Score;