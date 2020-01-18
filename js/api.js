// API Football v2, JSON dengan Fetch

// Deklarasi endpoint(s)
const elemsLoading = document.getElementById("loadingProgress");
const api_token = '9290cf263b2643baba05b3eed68fb033';
const base_url = "https://api.football-data.org/v2/";
const kode_liga = 2021;
const endpoint_klasemen_liga = `${base_url}competitions/${kode_liga}/standings`;
// var endpoint_info_tim = base_url + "teams";
const endpoint_jadwal = `${base_url}competitions/${kode_liga}/matches?status=SCHEDULED`;
const endpoint_detil_jadwal = `${base_url}matches/`;


// =================== DATE TIME
var convertDate = function (date) {
    const bulan = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return `${date.getDate()} ${bulan[date.getMonth()]} ${date.getFullYear()}`;
}
var convertTime = function (date) {
    var jam = date.getHours();
    var menit = date.getMinutes();

    if (menit == 0) {
        menit = "00";
    } else if (jam == 0) {
        jam = "00";
    }

    var timeStr = jam + ":" + menit;

    return timeStr;
}


// Loading bar
// var elems2 = document.querySelectorAll('.carousel.carousel-slider');

var fetchApi = base_url => {
    return fetch(base_url, {
        headers: {
            'X-Auth-Token': api_token
        }
    });
}


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

// Ambil klasemen liga
function getKlasemenLiga() {
    return new Promise(function (resolve, reject) {
        if ('caches' in window) {
            caches.match(endpoint_klasemen_liga).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        // Cek data
                        // console.log(data);
                        dataStanding(data);
                        resolve(data);

                    }).then(function () {
                        var elems2 = document.querySelectorAll('#card-carousel.carousel.carousel-slider');
                        M.Carousel.init(elems2, {
                            fullWidth: true,
                            indicators: true
                        });
                        elemsLoading.style.display = "none";
                    }).catch(error);
                }
            });
        }

        fetchApi(endpoint_klasemen_liga)
            .then(status)
            .then(json)
            .then(function (data) {
                // console.log(data);

                // Array/Object dari response.json() masuk lewat data
                // Menyusun komponen card secara dinamis
                elemsLoading.style.display = "block";

                dataStanding(data);
                resolve(data);

            }).then(function () {
                var elems2 = document.querySelectorAll('#card-carousel.carousel.carousel-slider');
                M.Carousel.init(elems2, {
                    fullWidth: true,
                    indicators: true
                });
                elemsLoading.style.display = "none";
            }).catch(error);
    });
}

// Ambil jadwal tanding
function getMatchSchedule() {
    return new Promise(function (resolve, reject) {
        if ('caches' in window) {
            caches.match(endpoint_jadwal).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        // Cek data
                        // console.log(data);
                        if(window.location.hash.substr(1) !== "match") {
                            dataMatchSchedule(data);
                        } else {
                            dataMatches(data);
                        }
                        resolve(data);
                    }).then(function () {
                        var elems2 = document.querySelectorAll('#schedule-container.carousel.carousel-slider');
                        var instances = M.Carousel.init(elems2, {
                            fullWidth: true,
                            indicators: true,
                            duration: 500
                        });
                        elemsLoading.style.display = "none";
                    }).catch(error);
                }
            });
        }

        fetchApi(endpoint_jadwal)
            .then(status)
            .then(json)
            .then(function (data) {
                // console.log(data);

                // Array/Object dari response.json() masuk lewat data
                // Menyusun komponen card secara dinamis
                elemsLoading.style.display = "block";

                if (window.location.hash.substr(1) !== "match") {
                    dataMatchSchedule(data);
                } else {
                    dataMatches(data);
                }
                resolve(data);

            }).then(function () {
                var elems2 = document.querySelectorAll('#schedule-container.carousel.carousel-slider');
                var instances = M.Carousel.init(elems2, {
                    fullWidth: true,
                    indicators: true,
                    duration: 500
                });
                elemsLoading.style.display = "none";
            }).catch(error);
    });
}

function getSavedMatch() {
    getAll().then(function (matches) {
        // console.log(data);
        // console.log(matches.length);
        if(matches.length == 0) {
            document.getElementById("body-content").innerHTML = "<h5 class='center'>No data</h5>";
        } else {
            dataSavedMatches(matches);
        }
    });
}



// ===================================================
// ===================================================
function dataStanding(data) {
    var standingHTML = "";
    var JSONStr = JSON.stringify(data).replace(/http:/g, 'https:');
    data = JSON.parse(JSONStr);

    data.standings[0].table.forEach(function (team) {
        standingHTML += `
            <div class="carousel-item text" href="#${team.position}!">
                <div class="row">
                    <div class="col l6 m12 s12 offset-l3">
                        <div class="card-panel z-depth-0">
                            <div class="card-content white text">
                                <div class="card-content text">
                                <img class="responsive-img" style="height: 100px; margin-bottom: -20px" height="100" src="${team.team.crestUrl}" alt="${team.team.name}" />
                                    <span class="card-title"><h2>${team.team.name}</h2></span> 
                                        <span style="position: relative; top: -20px">${data.competition.name}</span><br>
                                        <b style="position: relative; top: -20px">${team.points}pts</b>
                                        <table class="striped centered">
                                            <tbody>
                                                <tr>
                                                    <td><b>Position</b></td>
                                                    <td><b>${team.position}</b></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>Played</td>
                                                    <td>${team.playedGames}</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>Won</td>
                                                    <td>${team.won}</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>Draw</td>
                                                    <td>${team.draw}</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>Lost</td>
                                                    <td>${team.lost}</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>GF</td>
                                                    <td>${team.goalsFor}</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>GA</td>
                                                    <td>${team.goalsAgainst}</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>GD</td>
                                                    <td>${team.goalDifference}</td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    // Sisipkan ke #card-carousel
    document.getElementById("card-carousel").innerHTML = standingHTML;
}


// Match Schedule
function dataMatchSchedule(data) {
    var scheduleHTML = "";
    // var JSONStr = JSON.stringify(data).replace(/http:/g, 'https:');
    // data = JSON.parse(JSONStr);

    var JSONStr = data.matches;

    for (let i = 0; i < 3; i++) {
        scheduleHTML += `
            <div class="carousel-item text" href="#${JSONStr[i].id}!">
                <div class="row">
                    <div class="col l6 m12 s12 offset-l3">
                        <div class="card">
                            <div class="card-content white text">
                                <span class="card-title"></span>
                                <div class="center-align row">
                                    MATCHDAY: ${JSONStr[i].matchday}, ${JSONStr[i].status}<br>
                                    <div class="center-align">${convertTime(new Date(JSONStr[i].utcDate))} <span style="font-weight: normal;">-</span> ${convertDate(new Date(JSONStr[i].utcDate))}</div>
                                </div>
                                <div class="row">
                                    <div class="col s4 right-align"><b>${JSONStr[i].homeTeam.name}</b></div>
                                    <div class="col s4 center-align"">VS</div>
                                    <div class="col s4 left-align"><b>${JSONStr[i].awayTeam.name}</b></div>
                                </div>
                            </div>
                            <div class="card-action centered">
                                <a href="/matchdetail.html?id=${JSONStr[i].id}" class="center-align">Details</a>
                            </div>            
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /* moreScheduleHTML = `
        <div class="carousel-item text">
            <div class="row">
                <div class="col l6 m12 s12 offset-l3">
                    <div class="card teal">
                        <div class="card-content valign-wrapper" style="display: inline-grid; ">
                            <div class="card-title"></div>
                            <div class="row">
                                <a href="#match" role="navigation" class="btn-floating btn-large  waves-effect waves-light center-align"><i class="material-icons">arrow_forward</i></a>
                            </div>
                        </div>
                        <div class="card-action centered">
                            <div class="white-text center-align">See more</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    `; */

    // Sisipkan ke #card-carousel
    document.getElementById("schedule-container").innerHTML = scheduleHTML;
    /* document.getElementById("schedule-container").innerHTML += moreScheduleHTML; */
}

function dataMatches(data) {
    var scheduleHTML = "";
    // var JSONStr = JSON.stringify(data).replace(/http:/g, 'https:');
    // data = JSON.parse(JSONStr);

    var JSONStr = data.matches;

    for (let i = 0; i < 10; i++) {
        scheduleHTML += `
                    <div class="col l6 m12 s12 offset-l3">
                        <div class="card">
                            <div class="card-content card-image white text">
                                <span class="card-title"></span>
                                <!-- Not yet implemented
                                    <a class="btn-floating halfway-fab btn-large waves-effect waves-light btn center-align" ><i class="material-icons left">add_alert</i></a> 
                                -->
                                <div class="center-align row">
                                    MATCHDAY: ${JSONStr[i].matchday}, ${JSONStr[i].status}<br>
                                    <div class="center-align">${convertTime(new Date(JSONStr[i].utcDate))} <span style="font-weight: normal;">-</span> ${convertDate(new Date(JSONStr[i].utcDate))}</div>
                                </div>
                                <div class="row">
                                    <div class="col s4 right-align"><b>${JSONStr[i].homeTeam.name}</b></div>
                                    <div class="col s4 center-align"">VS</div>
                                    <div class="col s4 left-align"><b>${JSONStr[i].awayTeam.name}</b></div>
                                </div>
                            </div>
                            <div class="card-action centered">
                                <a href="/matchdetail.html?id=${JSONStr[i].id}" class="center-align">Details</a>
                            </div>            
                        </div>
                    </div>
        `;
    }

    // Sisipkan ke #card-carousel
    document.getElementById("schedule-container").innerHTML = scheduleHTML;
}

function dataSavedMatches(matches) {
    var scheduleHTML = "";

    matches.forEach(function (matches) {
        scheduleHTML += `
            <div class="col l6 m12 s12 offset-l3">
                <div class="card">
                    <div class="card-content card-image white text">
                        <span class="card-title"></span>
                        <!-- Not yet implemented
                            <a class="btn-floating halfway-fab btn-large waves-effect waves-light btn center-align" ><i class="material-icons left">add_alert</i></a> 
                        -->
                        <div class="center-align row">
                            MATCHDAY: ${matches.match.matchday}, ${matches.match.status}<br>
                            <div class="center-align">${convertTime(new Date(matches.match.utcDate))} <span style="font-weight: normal;">-</span> ${convertDate(new Date(matches.match.utcDate))}</div>
                        </div>
                        <div class="row">
                            <div class="col s4 right-align"><b>${matches.match.homeTeam.name}</b></div>
                            <div class="col s4 center-align"">VS</div>
                            <div class="col s4 left-align"><b>${matches.match.awayTeam.name}</b></div>
                        </div>
                    </div>
                    <div class="card-action centered">
                                <a href="/matchdetail.html?id=${matches.id}&saved=true" class="center-align">Details</a>
                            </div>            
                        </div>
                    </div>
        `;
    });

    // Sisipkan ke #card-carousel
    document.getElementById("schedule-container").innerHTML = scheduleHTML;
}