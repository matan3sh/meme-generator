'use strict'

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
                ${keyWord}
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

function onDeleteLine() {
    let currentMeme = getCurrentMeme();
    deleteLine(currentMeme)
    $('.add-line').val('')
    Materialize.toast('Delete Success', 4000, 'rounded')
    renderCanvas(currentMeme.selectedImgId);
}

function onIncDec(action) {
    let currentMeme = getCurrentMeme()
    let currentFontSize = currentMeme.textProps[currentMeme.selectedLineIdx].fontSize
    if (currentFontSize === 16) currentFontSize = 18
    if (currentFontSize === 60) currentFontSize = 58
    if (currentFontSize > 16 && currentFontSize < 60) {
        if (action === 'inc') currentFontSize += 2
        else currentFontSize -= 2
    }
    currentMeme.textProps[currentMeme.selectedLineIdx].fontSize = currentFontSize
    renderCanvas(currentMeme.selectedImgId)
}

function onUp() {
    let currentMeme = getCurrentMeme()
    let currentYPos = currentMeme.textProps[currentMeme.selectedLineIdx].yPos
    if (currentYPos === 0.95) currentYPos = 0.94
    else if (currentYPos === 0.15) currentYPos = 0.15
    else if (currentYPos > 0.95 || currentYPos > 0.15) currentYPos -= 0.05
    currentMeme.textProps[currentMeme.selectedLineIdx].yPos = currentYPos
    renderCanvas(currentMeme.selectedImgId)
}

function onDown() {
    let currentMeme = getCurrentMeme()
    let currentYPos = currentMeme.textProps[currentMeme.selectedLineIdx].yPos
    currentYPos = (currentYPos < 0.05) ? 0.05 : currentYPos + 0.05
    if (currentYPos > 0.95) currentYPos = 0.95
    currentMeme.textProps[currentMeme.selectedLineIdx].yPos = currentYPos
    renderCanvas(currentMeme.selectedImgId)
}

function onRight() {
    let currentMeme = getCurrentMeme()
    let currentXPos = currentMeme.textProps[currentMeme.selectedLineIdx].xPos
    if (currentXPos >= 0.85) currentXPos = 0.85
    else currentXPos += 0.05
    currentMeme.textProps[currentMeme.selectedLineIdx].xPos = currentXPos
    renderCanvas(currentMeme.selectedImgId)
}

function onLeft() {
    let currentMeme = getCurrentMeme()
    let currentXPos = currentMeme.textProps[currentMeme.selectedLineIdx].xPos
    if (currentXPos === 0.80) currentXPos = 0.80
    else if (currentXPos === 0.15) currentXPos = 0.15
    else if (currentXPos > 0.80 || currentXPos > 0.20) currentXPos -= 0.05
    currentMeme.textProps[currentMeme.selectedLineIdx].xPos = currentXPos
    renderCanvas(currentMeme.selectedImgId)
}

function onColorPicker(color) {
    let currentMeme = getCurrentMeme()
    $('.color-picker').val(color)
    currentMeme.textProps[currentMeme.selectedLineIdx].color = color
    renderCanvas(currentMeme.selectedImgId)
}

function onCanvasClicked(event) {
    let canvasHeight = $('#canvas').get(0).height;
    let yPos = event.offsetY / canvasHeight;
    handleCanvasClick(canvasHeight, yPos)
}

function onLineToggle(line) {
    $('.add-line').val(line.content)
}

function onDownloadMeme() {
    canvas.toDataURL('image/jpg')
    let imageData = canvas.toDataURL('jpg');
    let link = document.createElement('a');
    link.href = imageData;
    link.download = 'memeImage.jpg';
    link.click();
}