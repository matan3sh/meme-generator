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

function onDeleteLine() {
    let currentMeme = deleteLine()
    $('.add-line').val('')
    Materialize.toast('Delete Success', 4000, 'rounded')
    renderCanvas(currentMeme.selectedImgId);
}

function onAddSentence() {
    let inputTxt = $('.add-line').get(0);
    let currentMeme = addSentence(inputTxt)
    renderCanvas(currentMeme.selectedImgId);
}

function onAddStyle(style) {
    let currentMeme = {}
    switch (style) {
        case 'storke':
            currentMeme = addStorke()
            break
        case 'shadow':
            currentMeme = addShadow()
            break
        default:
            break
    }
    renderCanvas(currentMeme.selectedImgId)
}

function onResize(action) {
    let currentMeme = {}
    switch (action) {
        case 'inc':
            currentMeme = incText()
            break
        case 'dec':
            currentMeme = decText()
            break
        default:
            break
    }
    renderCanvas(currentMeme.selectedImgId)
}

function onMoveDirections(direction) {
    let currentMeme = {}
    switch (direction) {
        case 'up':
            currentMeme = moveTextUp()
            break
        case 'down':
            currentMeme = moveTextDown()
            break
        case 'right':
            currentMeme = moveTextRight()
            break
        case 'left':
            currentMeme = moveTextLeft()
            break
        default:
            break
    }
    renderCanvas(currentMeme.selectedImgId)
}

function onColorPicker(color) {
    let currentMeme = textColorPicker(color)
    $('.color-picker').val(color)
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

function onAlignment(align) {
    let currentMeme = {}
    switch (align) {
        case 'right':
            currentMeme = textAlignRight()
            break
        case 'left':
            currentMeme = textAlignLeft()
            break
        default:
            currentMeme = textAlignCenter()
    }
    renderCanvas(currentMeme.selectedImgId)
}

function onDownloadMeme() {
    canvas.toDataURL('image/jpg')
    let imageData = canvas.toDataURL('jpg');
    let link = document.createElement('a');
    link.href = imageData;
    link.download = 'memeImage.jpg';
    link.click();
}