// API
const api = {
  sindonewsUrl: "https://berita-news.herokuapp.com/",
  proxyUrl: "https://cors-anywhere.herokuapp.com/",
  urlNews: "http://newsapi.org/v2/",
  urlCovidIndonesia: "https://api.kawalcorona.com/",
  urlFootballApi: "https://apiv2.apifootball.com/",
  keyNews: "b422121f5eec42f786f7420a95272b7e",
  keyNews1: "adc2048d9f684f759754fdeb64ee7242",
  keyApiFootball: "799d55db35e3fc05fd2e3518dd53ad8f824164f6c74175f9d672853639467c5e",
};

// Membuat koma setelah 3 ribuan
function commaSeparateNumber(val) {
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d+)(\d{3})/, "$1" + "," + "$2");
  }
  return val;
}

// Array tanggal
const tgl = {
  days: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
  months: [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ],
};

// Formating tanggal
function timeDateFormat(val) {
  let d = new Date(val);
  const td = {
    dt: d.getUTCDate() +
      " " +
      tgl.months[d.getUTCMonth()] +
      " " +
      d.getUTCFullYear(),
    tm: d.getUTCHours() +
      ":" +
      (d.getUTCMinutes() < 10 ? "0" : "") +
      d.getUTCMinutes(),
  };

  return td;
}

// Function Top News Indonesia
function topNewsId() {
  $.ajax({
    url: api.urlNews + "top-headlines?country=id&apiKey=" + api.keyNews1,
    success: function (res) {
      if ((res.status = "ok")) {
        let w = res.articles;

        $("#top-news-id-3").append(
          `
          <div class="col-sm-8 my-auto">
            <div class="card shadow-sm">
                  
                  <img class="w-100" src="` +
          w[w.length - 3].urlToImage +
          `" />
                  <div class="card-img-overlay d-flex overlay-dark">
                      <div class="align-self-center mx-auto text-light">
                          <a href="` +
          w[w.length - 3].url +
          `" target="_blank" class="h2 font-weight-bolder text-light">` +
          w[w.length - 3].title +
          `
                              </a>
                          <br class="mb-3" />
                          <a class="mt-5">
                              <i class="fas fa-user mr-2"></i> <span >` +
          w[w.length - 3].author +
          `</span> -
                              <span ><i class="far fa-clock mr-2"></i>` +
          timeDateFormat(w[w.length - 3].publishedAt).dt +
          `</span>
                          </a>
                      </div>
                  </div>
              </div>
          </div>
          <div class="col-sm-4 my-auto">
              <div class="card mt-2 shadow-sm">
                  <img class="w-100" src="` +
          w[w.length - 2].urlToImage +
          `" />
                  <div class="card-img-overlay d-flex overlay-dark">
                      <div class="align-self-center my-auto mx-auto text-light">
                          <a href="` +
          w[w.length - 2].url +
          `" target="_blank" class="h5 font-weight-bolder text-light"
                              id="text-title-corona">` +
          w[w.length - 2].title +
          `</a>
                          <br />
                          <a class="mt-3">
                              <i class="fas fa-user mr-2"></i> <span>` +
          w[w.length - 2].author +
          `</span> -
                              <span id="time-edit-corona-news"><i class="far fa-clock mr-2"></i>` +
          timeDateFormat(w[w.length - 2].publishedAt).dt +
          `</span>
                          </a>
                      </div>
                  </div>
              </div>
              <div class="card mt-2 shadow-sm">
                  <img class="w-100" src="` +
          w[w.length - 1].urlToImage +
          `" />
                  <div class="card-img-overlay d-flex overlay-dark">
                      <div class="align-self-center mx-auto text-light">
                          <a href="` +
          w[w.length - 1].url +
          `" target="_blank" class="h5 font-weight-bolder text-light"
                              id="text-title-corona">` +
          w[w.length - 1].title +
          `</a>
                          <br />
                          <a class="mt-3">
                              <i class="fas fa-user mr-2"></i> <span id="author-corona">` +
          w[w.length - 1].author +
          `</span> -
                              <span id="time-edit-corona-news"><i class="far fa-clock mr-2"></i>` +
          timeDateFormat(w[w.length - 1].publishedAt).dt +
          `</span>
                          </a>
                      </div>
                  </div>
              </div>
          </div>
          `
        );

        $.each(w, function (i, data) {
          if (i < 12) {
            $("#berita-indonesia").append(
              `
            <div class="col-md-4 mt-5 ">
              <div class="card shadow">
                <div class="inner">
                  <img class="card-img-top"
                    src="` +
              data.urlToImage +
              `"
                    alt="Card image cap" />
                  </div>
                <div class="card-body">
                  <a class="card-title h5" target="_blank" href="` +
              data.url +
              `">` +
              data.title +
              `</a>
                  <p class="card-text">
                    ` +
              data.content.substring(0, 150) +
              `...
                  </p>
                  <p class="card-text">
                      <small class="text-muted mr-2">
                      <i class="far fa-calendar-check"></i>  
                      ` +
              timeDateFormat(data.publishedAt).dt +
              `
                      </small>
                      <small class="text-muted">
                      <i class="far fa-clock"></i>
                      ` +
              timeDateFormat(data.publishedAt).tm +
              `</small>

                  </p>
                </div>
              </div>
            </div>
          `
            );

            // Little Top News
            $("#top-news-nasional").after(
              `
            <div class="row mt-2 ml-1 border-bottom">
              <div class="col-md-4 my-auto">
                  <img class="card-img-top image-carousel"
                      src="` +
              data.urlToImage +
              `"
                      alt="Card image cap">
              </div>
              <div class="col-md-8 my-auto">
                  <a target="_blank" class="card-title text-dark" href="` +
              data.link +
              `">` +
              data.title +
              `</a>
                  <br />
                  <small class="text-muted">
                      <i class="far fa-clock mr-1"></i>
                      05 Juli 2020
                  </small>
              </div>
            </div>
          `
            );
          }

          if (i > 12) {
            return false;
          }
        });
      }
    },
  });
}

// Function NewsCovid
function newsCovid() {
  $.ajax({
    url: api.urlNews +
      "top-headlines?q=corona&sortBy=publishedAt&apiKey=" +
      api.keyNews,
    success: function (res) {
      $("#text-corona").after(
        `
        <!-- Berita Start -->
        <div class="row mt-3 mx-3">
          <!-- Image -->
          <div class="col-md-6">
            <div class="inner">
              <img class="card-img-top"
                src="` +
        res.articles[0].urlToImage +
        `" />
            </div>
          </div>

          <!-- Isi -->
          <div class="col-md-6 my-auto">
            <a class="h5 text-dark" href="` +
        res.articles[0].url +
        `">
              ` +
        res.articles[0].title +
        `
            </a>
            <p class="text-secondary">
              <small>
                <i class="fas fa-user"></i>
                ` +
        res.articles[0].author +
        `
                <span class="ml-2">
                  <i class="far fa-clock"></i>
                  ` +
        timeDateFormat(res.articles[0].publishedAt).dt +
        `
                </span>
              </small>
            </p>

            <p class="card-text">
              ` +
        res.articles[0].content.substring(0, 150) +
        `...
            </p>
          </div>
        </div>
        <!-- Berita End -->
      `
      );

      $("#image-corona").attr("src", res.articles[1].urlToImage);
      $("#text-title-corona")
        .text(res.articles[1].title)
        .attr("href", res.articles[1].url);
      $("#author-corona").text(res.articles[1].author);
      $("#time-edit-corona-news").text(
        timeDateFormat(res.articles[1].publishedAt).dt
      );
    },
  });
}

// Function Count Covid
function countCovidHome() {
  $.ajax({
    url: api.urlCovidIndonesia + "indonesia",
    success: function (res) {
      $("#count-positif").text(commaSeparateNumber(res[0].positif));
      $("#count-meninggal").text(commaSeparateNumber(res[0].meninggal));
      $("#count-sembuh").text(commaSeparateNumber(res[0].sembuh));
    },
  });
}

// Function Make Owl Carousel
function callOwlCarousel() {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 5,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        dots: true,
      },
      600: {
        dots: true,
        items: 3,
      },
      1000: {
        dots: true,
        items: 5,
        loop: false,
      },
    },
  });
}

function sindonewsAPI() {
  $(".loading").show();
  $.ajax({
    url: api.sindonewsUrl,
    success: function (res) {
      let w = res.data;
      $(".loading").hide();
      $.each(w, function (i, data) {
        if (i < 10) {
          $(".owl-carousel").append(
            `
            <div class="card shadow rounded-lg" style="width: 12rem;">
                  <div class="inner">
                    <img class="card-img-top image-carousel" src="` +
            data.poster +
            `" alt="Card image cap">
                  </div>
                  <div class="card-body">
                      <a target="_blank" class="card-title text-dark font-weight-bold" href="` +
            data.link +
            `">` +
            data.judul.substring(0, 25) +
            `...</a>
                      <p class="card-text"><small> ` +
            data.kutipan.substring(0, 50) +
            `...</small></p>
                  </div>
              </div>
          `
          );
        }

        if (i > 10) {
          return false;
        }
      });

      callOwlCarousel();
    },
  });
}

// News Business
function newsBusinessID() {
  $.ajax({
    url: api.urlNews +
      "top-headlines?country=id&category=business&apiKey=" +
      api.keyNews1,
    success: function (res) {
      let w = res.articles;

      $.each(w, function (i, data) {
        $("#row-news-id").append(
          `
          <div class="row mt-3 border-bottom pb-2">
              <div class="col-sm-4 my-auto">
                <div class="inner">
                  <img class="w-100" src="` +
          data.urlToImage +
          `" />
                </div>
              </div>
              <div class="col-sm-8 my-auto">
                  <a class="h4  text-dark" target="_blank" href="` +
          data.url +
          `">` +
          data.title +
          `</a>
                  <p class="m-0" >` +
          data.content.substring(0, 200) +
          `</p>
                  <small class="text-muted">` +
          timeDateFormat(data.publishedAt).dt +
          `</small>
              </div>
          </div>
        `
        );
      });
    },
  });
}

function newsBusinessIT() {
  $.ajax({
    url: api.urlNews + "top-headlines?category=business&apiKey=" + api.keyNews1,
    success: function (res) {
      let w = res.articles;

      $.each(w, function (i, data) {
        $("#row-news-it").append(
          `
          <div class="row mt-3 border-bottom pb-2">
              <div class="col-sm-4 my-auto">
                <div class="inner">
                  <img class="w-100" src="` +
          data.urlToImage +
          `" />
                </div>
              </div>
              <div class="col-sm-8 my-auto">
                  <a class="h4  text-dark" target="_blank" href="` +
          data.url +
          `">` +
          data.title +
          `</a>
                  <p class="m-0" >` +
          data.description +
          `</p>
                  <small class="text-muted">` +
          timeDateFormat(data.publishedAt).dt +
          `</small>
              </div>
          </div>
        `
        );
      });
    },
  });
}

// TOP News International
function topNewsIT() {
  $.ajax({
    url: api.urlNews + "top-headlines?country=us&apiKey=" + api.keyNews1,
    success: function (res) {
      if ((res.status = "ok")) {
        let w = res.articles;

        $("#top-news-it-3").append(
          `
          <div class="col-sm-8 my-auto">
            <div class="card shadow-sm">
                  
                  <img class="w-100" src="` +
          w[w.length - 3].urlToImage +
          `" />
                  <div class="card-img-overlay d-flex overlay-dark">
                      <div class="align-self-center mx-auto text-light">
                          <a href="` +
          w[w.length - 3].url +
          `" target="_blank" class="h2 font-weight-bolder text-light">` +
          w[w.length - 3].title +
          `
                              </a>
                          <br class="mb-3" />
                          <a class="mt-5">
                              <i class="fas fa-user mr-2"></i> <span >` +
          w[w.length - 3].author +
          `</span> -
                              <span ><i class="far fa-clock mr-2"></i>` +
          timeDateFormat(w[w.length - 3].publishedAt).dt +
          `</span>
                          </a>
                      </div>
                  </div>
              </div>
          </div>
          <div class="col-sm-4 my-auto">
              <div class="card mt-2 shadow-sm">
                  <img class="w-100" src="` +
          w[w.length - 2].urlToImage +
          `" />
                  <div class="card-img-overlay d-flex overlay-dark">
                      <div class="align-self-center my-auto mx-auto text-light">
                          <a href="` +
          w[w.length - 2].url +
          `" target="_blank" class="h5 font-weight-bolder text-light"
                              id="text-title-corona">` +
          w[w.length - 2].title +
          `</a>
                          <br />
                          <a class="mt-3">
                              <i class="fas fa-user mr-2"></i> <span>` +
          w[w.length - 2].author +
          `</span> -
                              <span id="time-edit-corona-news"><i class="far fa-clock mr-2"></i>` +
          timeDateFormat(w[w.length - 2].publishedAt).dt +
          `</span>
                          </a>
                      </div>
                  </div>
              </div>
              <div class="card mt-2 shadow-sm">
                  <img class="w-100" src="` +
          w[w.length - 1].urlToImage +
          `" />
                  <div class="card-img-overlay d-flex overlay-dark">
                      <div class="align-self-center mx-auto text-light">
                          <a href="` +
          w[w.length - 1].url +
          `" target="_blank" class="h5 font-weight-bolder text-light"
                              id="text-title-corona">` +
          w[w.length - 1].title +
          `</a>
                          <br />
                          <a class="mt-3">
                              <i class="fas fa-user mr-2"></i> <span id="author-corona">` +
          w[w.length - 1].author +
          `</span> -
                              <span id="time-edit-corona-news"><i class="far fa-clock mr-2"></i>` +
          timeDateFormat(w[w.length - 1].publishedAt).dt +
          `</span>
                          </a>
                      </div>
                  </div>
              </div>
          </div>
          `
        );

        $.each(w, function (i, data) {
          if (i < 12) {
            // Little Top News
            $("#top-news-internasional").after(
              `
            <div class="row mt-2 ml-1 border-bottom">
              <div class="col-md-4 my-auto">
                  <img class="card-img-top image-carousel"
                      src="` +
              data.urlToImage +
              `"
                      alt="Card image cap">
              </div>
              <div class="col-md-8 my-auto">
                  <a target="_blank" class="card-title text-dark" href="` +
              data.link +
              `">` +
              data.title +
              `</a>
                  <br />
                  <small class="text-muted">
                      <i class="far fa-clock mr-1"></i>
                      05 Juli 2020
                  </small>
              </div>
            </div>
          `
            );
          }

          if (i > 12) {
            return false;
          }
        });
      }
    },
  });
}

function newsSportID() {
  $.ajax({
    url: api.urlNews +
      "top-headlines?country=id&category=sport&apiKey=" +
      api.keyNews1,
    success: function (res) {
      let w = res.articles;

      $.each(w, function (i, data) {
        $("#row-news-sp").append(
          `
          <div class="row mt-3 border-bottom pb-2">
              <div class="col-sm-4 my-auto">
                <div class="inner">
                  <img class="w-100" src="` +
          data.urlToImage +
          `" />
                </div>
              </div>
              <div class="col-sm-8 my-auto">
                  <a class="h4  text-dark" target="_blank" href="` +
          data.url +
          `">` +
          data.title +
          `</a>
                  <p class="m-0" >` +
          data.content.substring(0, 200) +
          `</p>
                  <small class="text-muted">` +
          timeDateFormat(data.publishedAt).dt +
          `</small>
              </div>
          </div>
        `
        );
      });
    },
  });
}

function topFootball() {
  $.ajax({
    url: api.urlNews + "everything?q=sepak-bola&apiKey=" + api.keyNews1,
    success: function (res) {
      if ((res.status = "ok")) {
        let w = res.articles;

        $.each(w, function (i, data) {
          if (i < 12) {
            // Little Top News
            $("#top-news-football").after(
              `
            <div class="row mt-2 ml-1 border-bottom">
              <div class="col-md-4 my-auto">
                  <img class="card-img-top image-carousel"
                      src="` +
              data.urlToImage +
              `"
                      alt="Card image cap">
              </div>
              <div class="col-md-8 my-auto">
                  <a target="_blank" class="card-title text-dark" href="` +
              data.link +
              `">` +
              data.title +
              `</a>
                  <br />
                  <small class="text-muted">
                      <i class="far fa-clock mr-1"></i>
                      05 Juli 2020
                  </small>
              </div>
            </div>
          `
            );
          }

          if (i > 12) {
            return false;
          }
        });
      }
    },
  });
}

function topSindoCovid() {
  $.ajax({
    url: api.sindonewsUrl + "search/?q=covid-19",
    success: function (res) {

      if ((res.status = "200")) {
        let w = res.data;
        $.each(w, function (i, data) {
          if (i < 12) {
            // Little Top News
            $("#top-news-covid").after(
              `
            <div class="row mt-2 ml-1 border-bottom">
              
              <div class="my-auto pr-5">
                  <a class="small text-dark" target="_blank" class="card-title text-dark" href="` +
              data.link +
              `">` +
              data.judul.substring(0, 50) +
              `...</a>
                  <br />
                  <small class="text-muted">
                      <i class="far fa-clock mr-1"></i>
                      ` + data.waktu + `
                  </small>
              </div>
            </div>
          `
            );
          }

          if (i > 12) {
            return false;
          }
        });
      }
    }
  })
}

function covidIdProvince() {
  $.ajax({
    url: api.urlCovidIndonesia + "indonesia/provinsi",
    success: function (res) {
      var nomor = 0;
      $.each(res, function (i, data) {
        console.log();
        nomor = i + 1;
        $('#tbody-corona').append(`
        <tr>
        <td>` + nomor + `</td>
        <td>` + data.attributes.Provinsi + `</td>
        <td>` + data.attributes.Kasus_Posi + `</td>
        <td>` + data.attributes.Kasus_Semb + `</td>
        <td>` + data.attributes.Kasus_Meni + `</td>
        </tr>
        `);


      })

      $('#table-corona').DataTable({
        responsive: true,
        "searching": true,
        "lengthMenu": [
          [10, 5, 25],
          [10, 5, 25]
        ],
        "paging": true,
        "destroy": true,
        "lengthChange": true,
        "bInfo": false,
      });

    }
  })
}

function coronaAtas() {
  $.ajax({
    url: api.urlCovidIndonesia + "indonesia",
    success: function (res) {
      $('#covid-id').append(`
          <div class="card mx-3 shadow text-white bg-danger mb-3" style="max-width: 18rem;">
            <div class="card-header h4">Posisitf</div>
            <div class="card-body">
              <h5 class="card-title">` + res[0].positif + ` </h5>
            </div>
          </div>

          <div class="card mx-3 shadow text-white bg-success mb-3" style="max-width: 18rem;">
            <div class="card-header h4">Sembuh</div>
            <div class="card-body">
              <h5 class="card-title">` + res[0].sembuh + ` </h5>
            </div>
          </div>

          <div class="card mx-3 shadow text-white bg-warning mb-3" style="max-width: 18rem;">
            <div class="card-header h4">Meninggal</div>
            <div class="card-body">
              <h5 class="card-title">` + res[0].meninggal + ` </h5>
            </div>
          </div>

          <div class="card mx-3 shadow text-white bg-info mb-3" style="max-width: 18rem;">
            <div class="card-header h4">Dirawat</div>
            <div class="card-body">
              <h5 class="card-title">` + res[0].dirawat + ` </h5>
            </div>
          </div>
      `);
    }
  })
}

function coronaNews() {
  $.ajax({
    url: api.urlNews + "everything?q=corona&sortBy=publishedAt&language=id&apiKey=" + api.keyNews1,
    success: function (res) {
      let w = res.articles;

      $.ajax({
        url: api.urlNews + "top-headlines?q=corona&sortBy=publishedAt&country=id&apiKey=" + api.keyNews1,
        success: function (result) {
          let y = result.articles;
          // Small News Covid
          $('#small-news-covid').append(`
            <div class="card mt-2 shadow">
                <img class="w-100" src="` + y[0].urlToImage + `" />
                <div class="card-img-overlay d-flex overlay-dark">
                    <div class="align-self-center my-auto mx-auto text-light">
                        <a href="` + y[0].url + `" target="_blank" class="h5 font-weight-bolder text-light">` + y[0].title + `</a>
                        <br />
                        <a class="mt-3">
                            <i class="fas fa-user mr-2"></i> <span>` + y[0].author + `</span> -
                            <span id="time-edit-corona-news"><i class="far fa-clock mr-2"></i>` + timeDateFormat(y[0].publishedAt).dt + `</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="card mt-2 shadow">
                <img class="w-100" src="` + y[0].urlToImage + `" />
                <div class="card-img-overlay d-flex overlay-dark">
                    <div class="align-self-center my-auto mx-auto text-light">
                        <a href="` + y[0].url + `" target="_blank" class="h5 font-weight-bolder text-light">` + y[0].title + `</a>
                        <br />
                        <a class="mt-3">
                            <i class="fas fa-user mr-2"></i> <span>` + y[0].author + `</span> -
                            <span id="time-edit-corona-news"><i class="far fa-clock mr-2"></i>` + timeDateFormat(y[0].publishedAt).dt + `</span>
                        </a>
                    </div>
                </div>
            </div>
          `);
        }
      })


      $.each(w, function (i, data) {
        $("#row-news-covid").append(
          `
          <div class="row mt-3 border-bottom pb-2">
              <div class="col-sm-4 my-auto">
                <div class="inner">
                  <img class="w-100" src="` +
          data.urlToImage +
          `" />
                </div>
              </div>
              <div class="col-sm-8 my-auto">
                  <a class="h4  text-dark" target="_blank" href="` +
          data.url +
          `">` +
          data.title +
          `</a>
                  <p class="m-0" >` +
          data.content.substring(0, 200) +
          `</p>
                  <small class="text-muted">` +
          timeDateFormat(data.publishedAt).dt +
          `</small>
              </div>
          </div>
        `
        );
      });


    },

  });
}

$(document).ready(function () {
  $(".loading").hide();

  var pathname = window.location.pathname;

  if (pathname == "/index.html") {
    topNewsId();
    newsCovid();
    countCovidHome();
  } else if (pathname == "/nasional.html") {
    newsBusinessID();
    topNewsId();
    sindonewsAPI();
  } else if (pathname == "/international.html") {
    topNewsIT();
    newsBusinessIT();
  } else if (pathname == "/sport.html") {
    newsSportID();
    topFootball();
  } else if (pathname == "/covid.html") {
    coronaAtas();
    topSindoCovid();
    covidIdProvince();
    coronaNews();
  }

  if ($(window).width() > 992) {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 40) {
        $("#navbar_top").addClass("fixed-top");
        // add padding top to show content behind navbar
        $("body").css("padding-top", $(".navbar").outerHeight() + "px");
      } else {
        $("#navbar_top").removeClass("fixed-top");
        // remove padding top from body
        $("body").css("padding-top", "0");
      }
    });
  } // end if
});