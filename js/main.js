const api = {
  urlNews: "http://newsapi.org/v2/",
  keyNews: "b422121f5eec42f786f7420a95272b7e"
}

function topNewsId() {
  $.ajax({
    url: api.urlNews + "top-headlines?country=id&apiKey=" + api.keyNews,
    success: function (res) {
      // console.log(JSON.stringify(res));

      if (res.status = "ok") {

        let w = res.articles;

        console.log()
        $.each(w, function (i, data) {
          $('#berita-indonesia').append(`
            <div class="col-md-4 mt-5 ">
              <div class="card">
                <img class="card-img-top"
                  src="` + data.urlToImage + `"
                  alt="Card image cap" />
                <div class="card-body">
                  <a class="card-title h5" target="_blank" href="` + data.url + `">` + data.title + `</a>
                  <p class="card-text">
                    ` + data.content.substring(60) + `...
                  </p>
                  <p class="card-text">
                      <small class="text-muted mr-2">
                      <i class="far fa-calendar-check"></i>  
                      ` + data.publishedAt.substring(0, 10) + `
                      </small>
                      <small class="text-muted">
                      <i class="far fa-clock"></i>
                      ` + data.publishedAt.substring(11, 16) + `</small>

                  </p>
                </div>
              </div>
            </div>
          `);
        });

      }
      // if ()
    }
  })
}

$(document).ready(function () {
  topNewsId();
});