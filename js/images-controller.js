'use strict'

$(document).ready(onInit)
$('.modal').modal();

function onInit() {
  createImages()
  let images = getImages();
  renderImages(images)
}

function renderImages(images) {
  let strHTML = images.map(image => `<div data-target="modal" onclick="onImageClick(${image.id})"><img src="img/${image.id}.jpg"/></div>`)
  $('.images').html(strHTML.join(''))
}

function onImageClick(imageId) {
  renderCanvas(imageId)
  let image = getImageById(imageId)
  let keyWords = getImageKeyWords(image)
  let strHTMLTags = keyWords.map(keyWord =>
    ` <div class="chip">
      ${keyWord}<i class="close material-icons">close</i>
    </div>
  `)
  $('.chips').html(strHTMLTags)
}

function renderCanvas(imageId) {
  let img = new Image()
  img.src = `img/${imageId}.jpg`
  let elCanvas = $('#canvas').get(0)
  let elCanvasContainer = $('.card-image').get(0)
  let ctx = elCanvas.getContext('2d')
  img.onload = () => {
    let aspect = img.width / img.height
    elCanvas.width = elCanvasContainer.clientWidth
    elCanvas.height = elCanvas.width / aspect
    elCanvasContainer.height = elCanvas.height
    ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height)
  };
}

function onRenderByKeyWord(keyWord) {
  let images = getImages()
  let filteredImages = []
  for (let i = 0; i < images.length; i++) {
    let currentImage = getImageByKeyWord(images[i], keyWord)
    if (currentImage !== null) filteredImages.push(currentImage)
  }
  renderImages(filteredImages)
}
