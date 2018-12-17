var canvas = document.getElementById("espai");
var ctx = canvas.getContext("2d");
var vacio = document.getElementById("vacio");
var groc = document.getElementById("groc");
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
            formaNova[i][j] = this.forma[j][this.forma[i].length - 1 - i];
        }
    }
    this.forma = formaNova;
}

var joc = {
    color: 0,
    mouredreta: false,
    girA: false,
    mouredreta: false,
    moureesquerra: false,
    espai: [],
    puntuacio: 0,
    puntuacioMax: 0,
    Piece: new Piece(),
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
                else if (this.espai[i][x] == 1) {
                    ctx.drawImage(groc, x * 28, i * 28, 28, 28);
                } else if (this.espai[i][x] == 2) {
                    ctx.drawImage(lila, x * 28, i * 28, 28, 28);
                } else if (this.espai[i][x] == 3) {
                    ctx.drawImage(verd, x * 28, i * 28, 28, 28);
                } else if (this.espai[i][x] == 4) {
                    ctx.drawImage(roig, x * 28, i * 28, 28, 28);
                } else if (this.espai[i][x] == 5) {
                    ctx.drawImage(blau, x * 28, i * 28, 28, 28);
                } else if (this.espai[i][x] == 6) {
                    ctx.drawImage(taronga, x * 28, i * 28, 28, 28);
                } else
                    ctx.drawImage(morat, x * 28, i * 28, 28, 28);
            }
        }
    },
    BorrarFormaPiece: function () {
        for (var i = 0; i < 4; i++) {
            for (var x = 0; x < 4; x++) {
                //if(this.espai.length<=this.Piece.y + i && this.espai[i].length<=this.Piece.x + i)
                if (this.Piece.forma[i][x] == 1 && this.espai.length > (i + this.Piece.y))
                    this.espai[this.Piece.y + i][this.Piece.x + x] = 0;
            }
        }
    },
    FMoureDreta() {
        var pot = true;
        for (var x = 0; x < 4; x++) {
            for (var i = 0; i < 4; i++) {
                if (this.Piece.forma[x][i] == 1) {
                    if (i < 3) {
                        if (this.Piece.forma[x][i + 1] != 1 && this.espai[this.Piece.y + x][this.Piece.x + i + 1] != 0)
                            pot = false;
                    }
                    else
                        if (this.espai[this.Piece.y + x][this.Piece.x + i] != 0)
                            pot = false;
                }

            }

        }


        if (pot) {
            this.Piece.x = this.Piece.x + 1;
        }
        this.mouredreta = false;
    },
    FMoureEsquerra() {
        var pot = true;
        for (var x = 0; x < 4; x++) {
            if (this.Piece.forma[x][0] == 1) {
                if (this.espai[this.Piece.y + x][this.Piece.x + -1] != 0)
                    pot = false;

                else
                    if (this.espai[this.Piece.y + x][this.Piece.x - 1] != 0)
                        pot = false;
            }
        }
        if (pot) {
            this.Piece.x = this.Piece.x - 1;
        }
        this.moureesquerra = false;
    },
    BaixarPiece: function () {
        var nova = false;
        if (this.Piece.forma != null) {
            if (this.mouredreta) {
                this.BorrarFormaPiece();
                this.FMoureDreta();
            }
            else
                if (this.moureesquerra) {
                    this.BorrarFormaPiece();
                    this.FMoureEsquerra();
                }
                else
            if (this.girA) {
                this.BorrarFormaPiece();
                var formaAnt = this.Piece.forma;
                this.Piece.rotarEsquerra();
                this.EliminarEspai();
                if (this.comprovarGir(formaAnt)) {
                   
                }
                this.girA = false;
            }
            if (this.PotBaixar()) {
                this.BorrarFormaPiece();
                this.Piece.y = this.Piece.y + 1;
            } else {
                nova = true;
            }
            for (var i = 0; i < 4; i++) {
                for (var x = 0; x < 4; x++) {
                    if (this.Piece.forma[i][x] == 1)
                        this.espai[this.Piece.y + i][this.Piece.x + x] = this.color;
                }
            }
            if (nova)
                this.NewPiece();
        }
    },
    comprovarGir: function (formaAnt) {
        var pot = true;
        for (var i = 0; i < 4; i++) {
            for (var x = 0; x < 4; x++) {
                if (this.Piece.forma[i][x] == 1)
                    if (this.Piece.y + i + 1 < 24 && this.Piece.x + x < 10) {
                        if (this.espai[this.Piece.y + i + 1][this.Piece.x + x] != 0)
                            pot = false;
                    }
                    else { pot = false; }
            }
        }
        if (!pot) {
            this.Piece.forma = formaAnt;
        }
        return pot;
    },
    PotBaixar: function () {
        var pot = true;
        if (this.Piece.y + 4 < 25) {
            for (var i = 0; i < 4; i++) {
                for (var x = 0; x < 4; x++) {
                    if (this.Piece.forma[i][x] == 1) {
                        if (i < 3) {
                            if (this.Piece.forma[i + 1][x] != 1 && this.espai[this.Piece.y + i + 1][this.Piece.x + x] != 0)
                                pot = false;
                        }
                        else
                            if (this.espai[this.Piece.y + i + 1][this.Piece.x + x] != 0)
                                pot = false;
                    }

                }
            }


            return pot;
        }
    },
    EliminarEspai: function () {
        var pot = true;
        pot = true;
        for (var x = 0; x < 4; x++) {
            if (this.Piece.forma[x][0] != 0)
                pot = false;
        }
        if (pot) {

            for (var i = 0; i < this.Piece.forma.length - 1; i++) {
                //if (this.Piece.forma[i][x] != 0)
                for (var x = 0; x < this.Piece.forma[i].length; x++) {
                    this.Piece.forma[x][i] = this.Piece.forma[x][i + 1];
                    this.Piece.forma[x][i + 1] = 0;
                }
            }
            this.EliminarEspai();
        } else {
            pot = true;
            for (var x = 0; x < 4; x++) {
                if (this.Piece.forma[this.Piece.forma.length - 1][x] != 0)
                    pot = false;
            }
            this.Piece.y = this.Piece.y + 1;
            if (pot) {
                this.Piece.y = this.Piece.y - 1;
                for (var i = this.Piece.forma.length - 1; i > 0; i--) {
                    if (this.Piece.forma[this.Piece.forma.length - 1][x] != 0)
                        for (var x = 0; x < this.Piece.forma[i].length; x++) {
                            this.Piece.forma[i][x] = this.Piece.forma[i - 1][x];
                        }
                }
                this.Piece.forma[0] = [0, 0, 0, 0];
                this.EliminarEspai();
            }

        }

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
        if (this.Piece.color == null) {
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
        this.EliminarEspai();
    }

};

joc.inicialitzar();

joc.NewPiece();
var interval = setInterval(function () {
    joc.BaixarPiece();
    joc.MostrarEspai();
    //joc.Piece.rotarEsquerra();
}, 200);

document.getElementById("count").innerHTML = "SCORE : " + joc.Score;
function TeclaPitjada(e) {
    if (e["code"] == "ArrowUp") {
        joc.girA = true;
    } else
        if (e["code"] == "ArrowDown") {
            //Player["gir"] = 1;
        } else
            if (e["code"] == "ArrowRight") {
                joc.mouredreta = true;
            } else
                if (e["code"] == "ArrowLeft") {
                    joc.moureesquerra = true;
                }
    if (e["code"] == "Enter") {
        if (interval != null) {
            clearInterval(interval);
            interval = null;
        }
        Play();
    }
}