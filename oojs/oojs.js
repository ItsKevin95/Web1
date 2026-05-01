class Film {
    constructor(id, cim, ev, hossz) {
        this.id = id;
        this.cim = cim;
        this.ev = ev;
        this.hossz = hossz;
    }

    render() {
        const div = document.createElement("div");
        div.className = "film-card";

        div.innerHTML = `
            <h3>${this.cim}</h3>
            <p>ID: ${this.id}</p>
            <p>Év: ${this.ev}</p>
            <p>Hossz: ${this.hossz} perc</p>
        `;

        return div;
    }
}

class PremierFilm extends Film {
    constructor(id, cim, ev, hossz, dij) {
        super(id, cim, ev, hossz);
        this.dij = dij;
    }

    render() {
        const div = super.render();
        div.innerHTML += `<p>Díj: ${this.dij}</p>`;
        div.style.border = "2px solid gold";
        return div;
    }
}

class MoziApp {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.filmek = [];
    }

    addFilm(film) {
        this.filmek.push(film);
    }

    render() {
        this.container.innerHTML = "";
        this.filmek.forEach(f => this.container.appendChild(f.render()));
    }
}

async function loadFilms(app) {
    const res = await fetch("../data/film.txt");
    const text = await res.text();

    const lines = text.trim().split("\n");

    const films = lines.slice(1).map(line => {
        const v = line.split("\t");

        return new Film(
            v[0],
            v[1],
            v[2],
            v[3]
        );
    });

    films.forEach(f => app.addFilm(f));
    app.render();
}

const app = new MoziApp("app");

app.addFilm(new PremierFilm(999, "Speciális bemutató", 1950, 120, "Különdíj"));

loadFilms(app);
