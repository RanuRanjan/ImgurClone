const apiRoot = "https://api.unsplash.com";
const accessKey = "7af4fbd7b2d9792e76b52df48195b739567943bd8cccda6792e96c4c68e71a49";
const count = 5;
const loader = document.querySelector('#loader-img');

let imageGrid = document.querySelector('.image-grid');

const addToDom = photos => {
  photos.forEach(photo => {
    let el = document.createElement("div");
    el.classList.add('image-item');
    el.style.backgroundColor = photo.color;
    el.innerHTML =
      `<a href="${photo.links.download}" target="_blank"/>
        <img src="${photo.urls.regular}=">
        <div class="overlay">
          <div class="download">+</div>
        </div>
      </a>`;
    imageGrid.appendChild(el);
  });
};

const loadMore = () => {
  let photos = [];
  loader.style.display = "block";
  fetch(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
    .then((res) => {
    return res.json();
  })
    .then(data => {
    // console.log(data);
    photos.push(...data);
    addToDom(photos);
    loader.style.display = "none";
  })
    .catch( err => {
    console.log(err);
  });
};

window.addEventListener('scroll', function() {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
    loadMore();
  }
});

loadMore();