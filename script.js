let hrac = "X";
let deska = [];
let velikost = 10;
let tahy = 0;

// Časový limit pro každého hráče v sekundách
let casy = {
    "X": 60,
    "O": 60
};

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

// Spuštění odpočítávání každou 1 sekundu (1000 milisekund)
let casovac = setInterval(function() {
    casy[hrac]--; // Odečti 1 sekundu hráči, který je na tahu

    // Aktualizuj text na stránce
    document.getElementById("casX").innerText = casy["X"];
    document.getElementById("casO").innerText = casy["O"];

    // Pokud hráčovi došel čas
    if (casy[hrac] <= 0) {
        clearInterval(casovac);
        alert("Čas vypršel! Prohrál hráč " + hrac + ".");
        location.reload();
    }
}, 1000);

function kliknuto() {
    let r = parseInt(this.dataset.row);
    let c = parseInt(this.dataset.col);

    // Pokud už je políčko obsazené, nic nedělej
    if (deska[r][c] !== "") {
        return;
    }

    // Zápis tahu
    deska[r][c] = hrac;
    this.innerText = hrac;
    tahy++;

    // 1. KONTROLA VÝHRY
    if (zkontrolujVyhru(r, c, hrac)) {
        clearInterval(casovac);
        alert("Vyhrál hráč " + hrac + "!");
        location.reload();
        return;
    }

    // 2. KONTROLA REMÍZY
    if (tahy === velikost * velikost) {
        clearInterval(casovac);
        alert("Remíza!");
        location.reload();
        return;
    }

    // Změna hráče
    if (hrac === "X") {
        hrac = "O";
    } else {
        hrac = "X";
    }

    document.getElementById("info").innerText = "Na tahu je: " + hrac;
}

// Funkce na kontrolu 5 v řadě
function zkontrolujVyhru(r, c, symbol) {
    // 1. Vodorovně
    let vrade = 0;
    for (let j = 0; j < velikost; j++) {
        if (deska[r][j] === symbol) {
            vrade++;
            if (vrade === 5) return true;
        } else {
            vrade = 0;
        }
    }

    // 2. Svisle
    let vsloupci = 0;
    for (let i = 0; i < velikost; i++) {
        if (deska[i][c] === symbol) {
            vsloupci++;
            if (vsloupci === 5) return true;
        } else {
            vsloupci = 0;
        }
    }

    // 3. Diagonála \
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

    // 4. Diagonála /
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
