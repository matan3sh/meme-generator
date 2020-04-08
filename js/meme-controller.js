'use strict'

var gIsMarked = false

function onImageClick(imageId) {
  let image = getImageById(imageId)
  initMeme()
  renderCanvas(imageId)
  renderKeyWordsAtMeme(image)
}

function renderKeyWordsAtMeme(image) {
  let keyWords = getImageKeyWords(image)
  let strHTMLKeyWords = keyWords.map(keyWord =>
    `   <div class="chip">
                ${keyWord}<i class="close material-icons">close</i>
            </div>
        `)
  $('.chips').html(strHTMLKeyWords)
}

function renderCanvas(imageId) {
  setCurrentMeme(imageId)
  let img = new Image();
  img.src = `img/${imageId}.jpg`;
  let elCanvas = $('#canvas').get(0);
  let elCanvasContainer = $('.card-image').get(0);
  let ctx = elCanvas.getContext('2d');
  img.onload = () => {
    let aspect = img.width / img.height;
    elCanvas.width = elCanvasContainer.clientWidth;
    elCanvas.height = elCanvas.width / aspect;
    elCanvasContainer.height = elCanvas.height;
    ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height);
    renderSentence();
  };
}

function renderSentence() {
  let elCanvas = $('#canvas').get(0);
  let ctx = elCanvas.getContext('2d');
  ctx.textAlign = 'center';
  let currentMeme = getCurrentMeme();
  for (let i = 0; i < currentMeme.textProps.length; i++) {
    let text = currentMeme.textProps[i];
    let xPos = text.xPos * elCanvas.width;
    let yPos = text.yPos * elCanvas.height;
    ctx.font = `${text.fontSize}px ${text.fontFamily}`
    if (text.shadow) setShadow(ctx, text, xPos, yPos)
    ctx.fillStyle = text.color;
    if (gIsMarked && currentMeme.selectedLineIdx === text.lineIdx) continue;
    if (text.stroke) setStorke(ctx, text, xPos, yPos)
    ctx.fillText(text.content, xPos, yPos);
  }
}

function onAddLine() {
  addNewLine()
  $('.add-line').val('')
  $('.add-line').attr('placeholder', 'Insert Your New Line Here')
  let currentMeme = getCurrentMeme();
  renderCanvas(currentMeme.selectedImgId)
}

function onAddSentence() {
  let currentMeme = getCurrentMeme();
  let inputTxt = $('.add-line').get(0);
  currentMeme.textProps[currentMeme.selectedLineIdx].content = inputTxt.value;
  renderCanvas(currentMeme.selectedImgId);
}

function onAddShadow() {
  let currentMeme = getCurrentMeme();
  let currentMemeShadow = currentMeme.textProps[currentMeme.selectedLineIdx].shadow
  currentMemeShadow = (!currentMemeShadow) ? true : false
  currentMeme.textProps[currentMeme.selectedLineIdx].shadow = currentMemeShadow
  renderCanvas(currentMeme.selectedImgId);
}

function onAddStorke() {
  let currentMeme = getCurrentMeme();
  let currentMemeStorke = currentMeme.textProps[currentMeme.selectedLineIdx].stroke
  currentMemeStorke = (!currentMemeStorke) ? true : false
  currentMeme.textProps[currentMeme.selectedLineIdx].stroke = currentMemeStorke
  renderCanvas(currentMeme.selectedImgId);
}

function onDownloadMeme() {
  canvas.toDataURL('image/jpg')
  let imageData = canvas.toDataURL('jpg');
  let link = document.createElement('a');
  link.href = imageData;
  link.download = 'memeImage.jpg';
  link.click();
}