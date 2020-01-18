// Jika berhasil
function status(response) {
    if (response.status !== 200) {
        console.log("Error: " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

// Untuk parsing json menjadi array
function json(response) {
    return response.json();
}

// Handling kesalahan di blok catch
function error(error) {
    // Parameter error dari Promise.reject()
    console.log("Error: " + error);
}

function getMatchDetailById() {
    return new Promise(function (resolve, reject) {
        // Ambil query param (id)
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");

        if ("caches" in window) {
            caches.match(endpoint_detil_jadwal + idParam).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        // console.log(data);

                        dataMatchDetail(data);
                        resolve(data);
                    }).then(function () {
                        elemsLoading.style.display = "none";
                    }).catch(error);
                }
            });
        }

        fetchApi(endpoint_detil_jadwal + idParam)
            .then(status)
            .then(json)
            .then(function (data) {
                // Objek dari respons.json()
                // console.log(data);

                // Menyusun card
                dataMatchDetail(data);
                resolve(data);
            }).then(function () {
                elemsLoading.style.display = "none";
            }).catch(error);
    });
}

function getSavedMatchDetailById() {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    // console.log(idParam);

    getById(Number(idParam)).then(function (data) {
        dataSavedMatchDetail(data);
    }).then(function () {
        elemsLoading.style.display = "none"
    });
}



// ===================================================
// ===================================================
// Match Schedule
function dataMatchDetail(data) {
    var scheduleHTML = "";
    // var JSONStr = JSON.stringify(data).replace(/http:/g, 'https:');
    // data = JSON.parse(data);

    // var JSONStr = data.matches;

    scheduleHTML = `
        <div class="row">
            <div class="col l6 m12 s12 offset-l3">
                <div class="card-panel">
                    <div class="card-content white text center">
                        <span class="card-title">
                            <h5>${data.match.competition.name}</h5>
                        </span>
                        <div class="row">
                            Matchday: ${data.match.matchday}, <b>${data.match.status}</b><br>
                            Kick off: <b>${convertTime(new Date(data.match.utcDate))} <span style="font-weight: normal;">-</span> ${convertDate(new Date(data.match.utcDate))}</b><br>
                            Venue: <b>${data.match.venue}</b>
                        </div>
                        <div class="row" style="font-size: 1.15rem; background: #efefef; padding: 5px;">
                            <div class="col s4 right-align truncate"><b>${data.match.homeTeam.name}</b></div>
                            <div class="col s4">VS</div>
                            <div class="col s4 left-align truncate"><b>${data.match.awayTeam.name}</b></div>
                        </div>
                        <div class="row">
                            <hr size="1px">
                            <h6>Head to Head</h6>
                            <div class="center-align">Number of matches: <b>${data.head2head.numberOfMatches}</b></div>
                            <div class="center-align">Total goals: <b>${data.head2head.totalGoals}</b></div>

                            <div class="col s4 right-align"><b>${data.head2head.homeTeam.wins}</b></div>
                            <div class="col s4">Wins</div>
                            <div class="col s4 left-align"><b>${data.head2head.awayTeam.wins}</b></div>

                            <div class="col s4 right-align"><b>${data.head2head.homeTeam.draws}</b></div>
                            <div class="col s4">Draws</div>
                            <div class="col s4 left-align"><b>${data.head2head.awayTeam.draws}</b></div>

                            <div class="col s4 right-align"><b>${data.head2head.homeTeam.losses}</b></div>
                            <div class="col s4">Losses</div>
                            <div class="col s4 left-align"><b>${data.head2head.awayTeam.losses}</b></div>
                        </div>
                    </div>           
                </div>
            </div>
        </div>
    `;

    // Sisipkan ke #card-carousel
    document.getElementById("card-detail").innerHTML = scheduleHTML;
}


// Saved match detail
function dataSavedMatchDetail(data) {
    var scheduleHTML = "";
    // var JSONStr = JSON.stringify(data).replace(/http:/g, 'https:');
    // data = JSON.parse(data);

    // var JSONStr = data.matches;

    scheduleHTML = `
        <div class="row">
            <div class="col l6 m12 s12 offset-l3">
                <div class="card-panel">
                    <div class="card-content white text center">
                        <span class="card-title"></span>
                        <div class="row">
                            Matchday: ${data.match.matchday}, <b>${data.match.status}</b><br>
                            Kick off: <b>${convertTime(new Date(data.match.utcDate))} <span style="font-weight: normal;">-</span> ${convertDate(new Date(data.match.utcDate))}</b><br>
                            Venue: <b>${data.match.venue}</b>
                        </div>
                        <div class="row" style="font-size: 1.15rem; background: #efefef; padding: 5px;">
                            <div class="col s4 right-align truncate"><b>${data.match.homeTeam.name}</b></div>
                            <div class="col s4">VS</div>
                            <div class="col s4 left-align truncate"><b>${data.match.awayTeam.name}</b></div>
                        </div>
                        <div class="row">
                            <hr size="1px">
                            <h6>Head to Head</h6>
                            <div class="center-align">Number of matches: <b>${data.head2head.numberOfMatches}</b></div>
                            <div class="center-align">Total goals: <b>${data.head2head.totalGoals}</b></div>

                            <div class="col s4 right-align"><b>${data.head2head.homeTeam.wins}</b></div>
                            <div class="col s4">Wins</div>
                            <div class="col s4 left-align"><b>${data.head2head.awayTeam.wins}</b></div>

                            <div class="col s4 right-align"><b>${data.head2head.homeTeam.draws}</b></div>
                            <div class="col s4">Draws</div>
                            <div class="col s4 left-align"><b>${data.head2head.awayTeam.draws}</b></div>

                            <div class="col s4 right-align"><b>${data.head2head.homeTeam.losses}</b></div>
                            <div class="col s4">Losses</div>
                            <div class="col s4 left-align"><b>${data.head2head.awayTeam.losses}</b></div>
                        </div>
                    </div>           
                </div>
            </div>
        </div>
    `;

    // Sisipkan ke #card-carousel
    document.getElementById("card-detail").innerHTML = scheduleHTML;
}