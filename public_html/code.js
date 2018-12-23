var canvas = document.getElementById("espai");
var canvasSe = document.getElementById("proxima");
var ctx = canvas.getContext("2d");
var ctxSe = canvasSe.getContext("2d");
var vacio = document.getElementById("vacio");
var groc = document.getElementById("groc");
var Piece = function (forma, color) {
    this.forma = forma;
    this.color = color;
    this.x = 4;
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
    Score:0,
    
    girA: false,
    espaiEliminatX: 0,
    espaiEliminatY: 0,
    mouredreta: false,
    moureesquerra: false,
    baixar: false,
    espai: [],
    puntuacio: 0,
    puntuacioMax: 0,
    Piece: new Piece(),
    nextPiece: [],
    comptador: [0, 0, 0, 0, 0, 0, 0],
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
                ctx.drawImage(this.CalculColor(this.espai[i][x]), x * 28, i * 28, 28, 28);
            }
        }
    },
    CalculColor(pos) {
        if (pos == 0)
            return vacio;
        else if (pos == 1) {
            return groc;
        } else if (pos == 2) {
            return lila;
        } else if (pos == 3) {
            return verd;
        } else if (pos == 4) {
            return roig;
        } else if (pos == 5) {
            return blau;
        } else if (pos == 6) {
            return taronga;
        } else
            return morat;
    }
    ,
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
            this.BorrarFormaPiece();
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
            this.BorrarFormaPiece();
            this.Piece.x = this.Piece.x - 1;

        }
        this.moureesquerra = false;
    },
    BaixarPiece: function () {
        var nova = false;
        if (this.Piece.forma != null) {
            if (this.mouredreta && !this.baixar ) {

                this.FMoureDreta();

            }
            else
                if (this.moureesquerra && !this.baixar) {

                    this.FMoureEsquerra();

                }
                else
                    if (this.girA && !this.baixar) {
                        this.espaiEliminatX = 0;
                        this.espaiEliminatY = 0;
                        this.BorrarFormaPiece();
                        var formaAnt = this.Piece.forma;
                        this.Piece.rotarEsquerra();
                        this.EliminarEspai();

                        if (this.comprovarGir(formaAnt)) {

                            this.Piece.x = this.Piece.x + this.espaiEliminatX;
                            this.Piece.y = this.Piece.y - this.espaiEliminatY + 1;
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
            
            if (nova) {
                
                this.baixar=false;
                if (this.Piece.y > 2){
                    this.EliminarFilasCompletas();
                    this.NewPiece();
                }
                else
                    clearInterval(interval);
            }
            if(this.baixar)
            {this.BaixarPiece();}
        }
    },
    EliminarFilasCompletas:function()
    {
        for (var i = 24; i >= 0; i--) {
            var eliminar = true;
            for (var x = 0; x < 10; x++) {
                if(this.espai[i][x]==0)
                {
                    eliminar = false;
                }
            }
            if(eliminar){
            for(var i = 24; i >= 0; i--){
            if(i!=0)
            this.espai[i]=this.espai[i-1];
            else
            this.espai[i]=[0,0,0,0,0,0,0,0,0,0];

            }
            i=0;
            this.EliminarFilasCompletas();
            }
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
            this.espaiEliminatY = this.espaiEliminatY + 1;
            this.EliminarEspai();
        } else {
            pot = true;
            for (var x = 0; x < 4; x++) {
                if (this.Piece.forma[this.Piece.forma.length - 1][x] != 0)
                    pot = false;
            }

            if (pot) {

                for (var i = this.Piece.forma.length - 1; i > 0; i--) {
                    if (this.Piece.forma[this.Piece.forma.length - 1][x] != 0)
                        for (var x = 0; x < this.Piece.forma[i].length; x++) {
                            this.Piece.forma[i][x] = this.Piece.forma[i - 1][x];
                        }
                }
                this.espaiEliminatX = this.espaiEliminatX + 1;
                this.Piece.forma[0] = [0, 0, 0, 0];
                this.EliminarEspai();
            }

        }

    },
    RandomPiece: function () {
        var peces = [
            [[[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]], 1],
            [[[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]], 2],
            [[[0, 0, 0, 0], [0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0]], 3],
            [[[0, 0, 0, 0], [0, 1, 1, 0], [0, 0, 1, 1], [0, 0, 0, 0]], 4],
            [[[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]], 5],
            [[[0, 1, 1, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]], 6],
            [[[0, 0, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]], 7]]
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
        this.color = this.Piece.color; 
        this.EliminarEspai();
        this.SeguentPiece();
        this.comptador[this.color-1]=this.comptador[this.color-1]+1;
        this.Score=this.Score+10;

    },
    SeguentPiece: function () {
        
        for (var i = 0; i < 4; i++) {
            for (var x = 0; x < 4; x++) {
                if(this.nextPiece.forma[x][i]==1)
                ctxSe.drawImage(this.CalculColor(this.nextPiece.color), x * 28, i * 28, 28, 28);
                else
                ctxSe.drawImage(vacio, x * 28, i * 28, 28, 28);
            }
        }
    }

};

joc.inicialitzar();


var interval = setInterval(function () {

    joc.BaixarPiece();
    joc.MostrarEspai();
    document.getElementById("tgroc").innerHTML =  joc.comptador[0];
    document.getElementById("tlila").innerHTML =  joc.comptador[1];
    document.getElementById("tverd").innerHTML =  joc.comptador[2];
    document.getElementById("troig").innerHTML =  joc.comptador[3];
    document.getElementById("tblau").innerHTML =  joc.comptador[4];
    document.getElementById("ttaronja").innerHTML =  joc.comptador[5];
    document.getElementById("tmorat").innerHTML =  joc.comptador[6];
    document.getElementById("count").innerHTML = "SCORE : " + joc.Score;
    //joc.Piece.rotarEsquerra();
}, 200);

function TeclaPitjada(e) {
    if (e["code"] == "ArrowUp") {
        joc.girA = true;
    } else
        if (e["code"] == "ArrowDown") {
            joc.baixar=true;
        joc.Score=joc.Score+1;
        } else
            if (e["code"] == "ArrowRight") {
                joc.mouredreta = true;
            } else
                if (e["code"] == "ArrowLeft") {
                    joc.moureesquerra = true;
                }
    if (e["code"] == "Enter") {
        joc.baixar=true;
        joc.Score=joc.Score+1;
    }
}