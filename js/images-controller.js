'use strict'

$(document).ready(() => { onInit(); initMap() })
$('.modal').modal();

var gIsMarked = false;

function onInit() {
  createImages()
  let images = getImages();
  renderImages(images)
}

function renderImages(images) {
  let strHTML = images.map(image => `<div data-target="modal" onclick="onImageClick(${image.id})"><img src="img/${image.id}.jpg"/></div>`)
  $('.images').html(strHTML.join(''))
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

function onSubmitMessage(event) {
  event.preventDefault()
  Materialize.toast('Messege Sent', 4000, 'rounded')
}
