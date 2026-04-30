let films = [];

async function loadFilms() {
    const res = await fetch('/data/film.txt');
    const text = await res.text();

    const lines = text.trim().split('\n');

    films = lines.slice(1).map(line => {
        const values = line.split('\t');

        return {
            id: values[0],
            cim: values[1],
            ev: values[2],
            hossz: values[3]
        };
    });

    renderFilms();
}

function renderFilms() {
    const table = document.getElementById('filmTable');

    table.innerHTML = `
        <tr>
            <th style="padding:8px;border-bottom:2px solid #000;">ID</th>
            <th style="padding:8px;border-bottom:2px solid #000;">Cím</th>
            <th style="padding:8px;border-bottom:2px solid #000;">Év</th>
            <th style="padding:8px;border-bottom:2px solid #000;">Hossz</th>
            <th style="padding:8px;border-bottom:2px solid #000;">Művelet</th>
        </tr>
    `;

    films.forEach((film, index) => {
        table.innerHTML += `
            <tr style="border-bottom:1px solid #ddd;">
                <td style="padding:6px;">${film.id}</td>

                <td contenteditable
                    onblur="updateFilm(${index}, 'cim', this.innerText)"
                    style="padding:6px;">
                    ${film.cim}
                </td>

                <td contenteditable
                    onblur="updateFilm(${index}, 'ev', this.innerText)"
                    style="padding:6px;">
                    ${film.ev}
                </td>

                <td contenteditable
                    onblur="updateFilm(${index}, 'hossz', this.innerText)"
                    style="padding:6px;">
                    ${film.hossz}
                </td>

                <td style="padding:6px;">
                    <button onclick="deleteFilm(${index})" style="padding:4px 8px; cursor:pointer;">
                        Törlés
                    </button>
                </td>
            </tr>
        `;
    });
}

function addFilm() {
    const cim = document.getElementById('cim').value;
    const ev = document.getElementById('ev').value;
    const hossz = document.getElementById('hossz').value;

    const newId = films.length
        ? Math.max(...films.map(f => +f.id)) + 1
        : 1;

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