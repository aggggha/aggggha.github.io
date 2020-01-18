var dbPromised = idb.open("football-scoreboard", 1, function (upgradeDb) {
    var matchesObjectStore = upgradeDb.createObjectStore("matches", { keyPath: "id" });
});

function createData(data) {
    var collectedData = {
        id: data.match.id,
        head2head: {
            numberOfMatches: data.head2head.numberOfMatches,
            totalGoals: data.head2head.totalGoals,
            homeTeam: {
                wins: data.head2head.homeTeam.wins,
                draws: data.head2head.homeTeam.draws,
                losses: data.head2head.homeTeam.losses
            },
            awayTeam: {
                wins: data.head2head.awayTeam.wins,
                draws: data.head2head.awayTeam.draws,
                losses: data.head2head.awayTeam.losses
            }
        },
        match: {
            utcDate: data.match.utcDate,
            venue: data.match.venue,
            matchday: data.match.matchday,
            status: data.match.status,
            homeTeam: {
                name: data.match.homeTeam.name
            },
            awayTeam: {
                name: data.match.awayTeam.name
            }
        }
    }
    // console.log(collectedData);
    saveForLater(collectedData);
}

// Menghapus data
function deleteData(id) {
    dbPromised
    .then(function (db) {
        var tx = db.transaction("matches", "readwrite");
        var store = tx.objectStore("matches");
        store.delete(id);
        return tx.complete;
    }).then(function () {
        console.log("Item dihapus.");
    })
}

function saveForLater(data) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("matches", "readwrite");
            var store = tx.objectStore("matches");
            store.put(data);
            return tx.complete;
        })
        .then(function () {
            M.toast({html: 'Data ditambahkan'});
            document.getElementsByClassName("save-status")[0].innerHTML = "Saved";
            document.getElementsByClassName("save-status")[0].removeAttribute('id');
            console.log("Artikel disimpan.");

        });
}

function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("matches", "readonly");
                var store = tx.objectStore("matches");
                return store.getAll();
            })
            .then(function (data) {
                resolve(data);
            });
    });
}

function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
        .then(function (db) {
            var tx = db.transaction("matches", "readonly");
            var store = tx.objectStore("matches");
            return store.get(id);
        })
        .then(function (data) {
            resolve(data); 
        });
    });
}