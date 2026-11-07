let hrac = "X";
let deska = [];
let velikost = 10;
let tahy = 0;

// Vytvoření mřížky po načtení
let tabulka = document.getElementById("hraciPlocha");

for (let i = 0; i < velikost; i++) {
    let radek = document.createElement("tr");
    deska[i] = [];
    
    for (let j = 0; j < velikost; j++) {
        let policko = document.createElement("td");
        policko.dataset.row = i;
        policko.dataset.col = j;
        policko.onclick = kliknuto;
        
        radek.appendChild(policko);
        deska[i][j] = "";
    }
    tabulka.appendChild(radek);
}

function kliknuto() {
    let r = parseInt(this.dataset.row);
    let c = parseInt(this.dataset.col);

    if (deska[r][c] !== "") {
        return;
    }

    deska[r][c] = hrac;
    this.innerText = hrac;
    tahy++;

    if (zkontrolujVyhru(r, c, hrac)) {
        alert("Vyhrál hráč " + hrac + "!");
        location.reload();
        return;
    }

    if (tahy === velikost * velikost) {
        alert("Remíza!");
        location.reload();
        return;
    }

    if (hrac === "X") {
        hrac = "O";
    } else {
        hrac = "X";
    }

    document.getElementById("info").innerText = "Na tahu je: " + hrac;
}

function zkontrolujVyhru(r, c, symbol) {
    let vrade = 0;
    for (let j = 0; j < velikost; j++) {
        if (deska[r][j] === symbol) {
            vrade++;
            if (vrade === 5) return true;
        } else {
            vrade = 0;
        }
    }

    let vsloupci = 0;
    for (let i = 0; i < velikost; i++) {
        if (deska[i][c] === symbol) {
            vsloupci++;
            if (vsloupci === 5) return true;
        } else {
            vsloupci = 0;
        }
    }

    let diag1 = 0;
    for (let i = -4; i <= 4; i++) {
        let nr = r + i;
        let nc = c + i;
        if (nr >= 0 && nr < velikost && nc >= 0 && nc < velikost) {
            if (deska[nr][nc] === symbol) {
                diag1++;
                if (diag1 === 5) return true;
            } else {
                diag1 = 0;
            }
        }
    }

    let diag2 = 0;
    for (let i = -4; i <= 4; i++) {
        let nr = r + i;
        let nc = c - i;
        if (nr >= 0 && nr < velikost && nc >= 0 && nc < velikost) {
            if (deska[nr][nc] === symbol) {
                diag2++;
                if (diag2 === 5) return true;
            } else {
                diag2 = 0;
            }
        }
    }

    return false;
}
