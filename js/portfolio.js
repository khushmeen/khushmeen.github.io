$(document).ready(function() {

  function renderFilter(query) {
    let filter = document.getElementById('filter');
    let button = document.createElement('button')

    button.setAttribute('type', 'button')
    button.className = 'btn btn-outline-primary filter-button'
    if(query === '') {
      button.className = 'btn btn-outline-primary filter-button active-button'
    }
    button.innerHTML = "All"
    button.addEventListener("click", filterClick);

    filter.appendChild(button)


    $.getJSON("data/category.json", function( data ) {

        data.forEach(category => {
          //<button type="button" class="btn btn-outline-primary" id="-1">All</button>
          button = document.createElement('button')
          button.setAttribute('type', 'button')
          button.className = 'btn btn-outline-primary filter-button'
          button.innerHTML = category.title
          button.id = category.key

          button.addEventListener("click", filterClick);

          if (query.toLowerCase() == category.key.toLowerCase()) {
            button.className = 'btn btn-outline-primary active-button filter-button'
          }

          filter.appendChild(button)
        })
    });
  }

/*
<div class="card">
  <div class="card-img-top">
    <iframe src="https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/spooksandooks/videos/323843081757840/F" style="border:none;overflow:hidden" width="100%" height="100%" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>
  </div>
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
*/
  function appendVideo(video) {
    let videos = document.getElementById('videos')

    let element = document.createElement('div')
    element.className = 'col-sm-4 video'

    let card = document.createElement('div')
    card.className = 'card'

    let body = document.createElement('div')
    body.className = 'card-body'

    // placeholder for the video
    let placeholder = document.createElement('div')
    placeholder.className = 'card-img-top card-video-image'

    // render video using vimeo
    if (video.url) {
      let vim = document.createElement('iframe')
      vim.height = "100%"
      vim.width = "100%"
      vim.scrolling = "no"
      vim.frameborder = "0"
      vim.allowTransparency = "true"
      vim.webkitallowfullscreen = true
      vim.mozallowfullscreen = true
      vim.allowfullscreen = true

      vim.className = "custom-iframe"
      vim.src = video.url

      placeholder.appendChild(vim)
    }

    let header = document.createElement('h5')
    header.className = 'card-title'
    header.innerHTML = video.title

    let description = document.createElement('p')
    description.className = 'card-text'
    description.innerHTML = video.description


    body.appendChild(header)
    body.appendChild(description)
    card.appendChild(placeholder)
    card.appendChild(body)
    element.appendChild(card)

    videos.appendChild(element)
  }

  function renderVideos(query) {
    $('.video').remove();

    $.getJSON("/data/work.json", function( data ) {
      let element,card,content;

      data.forEach(video => {
        if (query && query.toLowerCase() == video.category.toLowerCase()) { //filter applied
          appendVideo(video)
        } else if(query == '') {
          appendVideo(video)
        }
      });
    })
  }

  function render() {
    let url = window.location.toString().split('?');
    let query = url.length>1 ?  url[1].split('&')[0].split('=')[1] : ''

    renderFilter(query);
    renderVideos(query);
  }
/*

  $('.filter-button').click(function() {
    console.log("asd");
  })

*/
  function filterClick(e) {
    $('.filter-button').removeClass('active-button');
    $(e.target).addClass('active-button')
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?category=' + e.target.id;
    window.history.pushState({path:newurl},'',newurl);
    renderVideos(e.target.id)
  }
  render();
})
