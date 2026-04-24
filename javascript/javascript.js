let films = [];

async function loadFilms() {
    const res = await fetch('/data/film.txt');
    const text = await res.text();

    const lines = text.trim().split('\n');
    const headers = lines[0].split('\t');

    films = lines.slice(1).map(line => {
        const values = line.split('\t');
        let obj = {};
        headers.forEach((h, i) => obj[h] = values[i]);
        return obj;
    });

    renderFilms();
}

function renderFilms() {
    const table = document.getElementById('filmTable');
    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Cím</th>
            <th>Év</th>
            <th>Hossz</th>
            <th>Művelet</th>
        </tr>
    `;

    films.forEach((film, index) => {
        table.innerHTML += `
            <tr>
                <td>${film.id}</td>
                <td contenteditable onblur="updateFilm(${index}, 'cim', this.innerText)">${film.cim}</td>
                <td contenteditable onblur="updateFilm(${index}, 'ev', this.innerText)">${film.ev}</td>
                <td contenteditable onblur="updateFilm(${index}, 'hossz', this.innerText)">${film.hossz}</td>
                <td>
                    <button onclick="deleteFilm(${index})">Törlés</button>
                </td>
            </tr>
        `;
    });
}

function addFilm() {
    const cim = document.getElementById('cim').value;
    const ev = document.getElementById('ev').value;
    const hossz = document.getElementById('hossz').value;

    const newId = films.length ? Math.max(...films.map(f => +f.id)) + 1 : 1;

    films.push({
        id: newId,
        cim,
        ev,
        hossz
    });

    renderFilms();
}

function updateFilm(index, field, value) {
    films[index][field] = value;
}

function deleteFilm(index) {
    films.splice(index, 1);
    renderFilms();
}

loadFilms();