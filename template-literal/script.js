/*
 * Template literal
 */

var photos = [
  {
    id: 1,
    title: "accusamus beatae ad facilis cum similique qui sunt",
    thumbnailUrl: "https://via.placeholder.com/150/92c952"
  },
  {
    id: 2,
    title: "reprehenderit est deserunt velit ipsam",
    thumbnailUrl: "https://via.placeholder.com/150/771796"
  },
  {
    id: 3,
    title: "officia porro iure quia iusto qui ipsa ut modi",
    thumbnailUrl: "https://via.placeholder.com/150/24f355"
  },
  {
    id: 4,
    title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
    thumbnailUrl: "https://via.placeholder.com/150/d32776"
  }
];

var photoListTemplate = '';

for(var photo of photos) {
    // backtick
    photoListTemplate = photoListTemplate + `
      <div class="card p-5 ${photo.id === 3 ? 'bg-light' : ''}">
        #${photo.id} <br>
        ${photo.title}
        <img src="${photo.thumbnailUrl}">
      </div>`;
}

document.getElementById('photos-list-container').innerHTML = photoListTemplate;


