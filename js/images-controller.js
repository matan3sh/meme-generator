'use strict'

$(document).ready(() => { onInit(); initMap(); })
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
    let myEmail = 'matan3sh@gmail.com'
    let subject = $('#subject').val()
    let message = $('#textarea').val()
    Materialize.toast('You Transfer to Gmail', 4000, 'rounded')
    window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${myEmail}&su=${subject}&body=${message}`
    );
}
