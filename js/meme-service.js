'use strict'

var gMeme

function initMeme() {
    gMeme = {
        selectedImgId: 1,
        selectedLineIdx: 0,
        textProps: [
            {
                fontFamily: "impact",
                color: "white",
                fontSize: 40,
                xPos: 0.5,
                yPos: 0.15,
                lineIdx: 0,
                content: "",
                shadow: false,
                stroke: true
            }
        ]
    };
}

function getCurrentMeme() {
    return gMeme;
}

function setCurrentMeme(imageId) {
    gMeme.selectedImgId = imageId;
}

function setShadow(ctx, text, xPos, yPos) {
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillText(
        text.content,
        xPos + text.fontSize * 0.12,
        yPos + text.fontSize * 0.10
    );
}

function setStorke(ctx, text, xPos, yPos) {
    ctx.lineWidth = text.fontSize * 0.10;
    ctx.strokeText(text.content, xPos, yPos);
}

function addNewLine() {
    let currentMeme = getCurrentMeme()
    let currentColor = currentMeme.textProps[currentMeme.selectedLineIdx].color;
    let currentFontSize = currentMeme.textProps[currentMeme.selectedLineIdx].fontSize;
    let newLineIndex = currentMeme.textProps.length
    gMeme.selectedLineIdx = newLineIndex
    let newPos = (newLineIndex === 1) ? 0.95 : 0.55
    gMeme.textProps.push({
        fontFamily: 'impact',
        color: currentColor,
        fontSize: currentFontSize,
        xPos: 0.5,
        yPos: newPos,
        lineIdx: newLineIndex,
        content: '_',
        shadow: false,
        stroke: true
    })
}

function deleteLine() {
    let currentMeme = getCurrentMeme()
    gMeme.textProps[currentMeme.selectedLineIdx].content = ''
    return gMeme
}

function addSentence(inputText) {
    let currentMeme = getCurrentMeme();
    gMeme.textProps[currentMeme.selectedLineIdx].content = inputText.value;
    return gMeme
}

function addShadow() {
    let currentMeme = getCurrentMeme();
    let currentMemeShadow = currentMeme.textProps[currentMeme.selectedLineIdx].shadow
    currentMemeShadow = (!currentMemeShadow) ? true : false
    gMeme.textProps[currentMeme.selectedLineIdx].shadow = currentMemeShadow
    return gMeme
}

function addStorke() {
    let currentMeme = getCurrentMeme();
    let currentMemeStorke = currentMeme.textProps[currentMeme.selectedLineIdx].stroke
    currentMemeStorke = (!currentMemeStorke) ? true : false
    gMeme.textProps[currentMeme.selectedLineIdx].stroke = currentMemeStorke
    return gMeme
}

function incText() {
    let currentMeme = getCurrentMeme()
    let currentFontSize = currentMeme.textProps[currentMeme.selectedLineIdx].fontSize
    if (currentFontSize === 60) currentFontSize = 60
    else currentFontSize += 2
    gMeme.textProps[currentMeme.selectedLineIdx].fontSize = currentFontSize
    return gMeme
}

function decText() {
    let currentMeme = getCurrentMeme()
    let currentFontSize = currentMeme.textProps[currentMeme.selectedLineIdx].fontSize
    if (currentFontSize === 16) currentFontSize = 16
    else currentFontSize -= 2
    gMeme.textProps[currentMeme.selectedLineIdx].fontSize = currentFontSize
    return gMeme
}

function moveTextUp() {
    let currentMeme = getCurrentMeme()
    let currentYPos = currentMeme.textProps[currentMeme.selectedLineIdx].yPos
    if (currentYPos === 0.95) currentYPos = 0.94
    else if (currentYPos === 0.15) currentYPos = 0.15
    else if (currentYPos > 0.95 || currentYPos > 0.15) currentYPos -= 0.05
    gMeme.textProps[currentMeme.selectedLineIdx].yPos = currentYPos
    return gMeme
}

function moveTextDown() {
    let currentMeme = getCurrentMeme()
    let currentYPos = currentMeme.textProps[currentMeme.selectedLineIdx].yPos
    currentYPos = (currentYPos < 0.05) ? 0.05 : currentYPos + 0.05
    if (currentYPos > 0.95) currentYPos = 0.95
    gMeme.textProps[currentMeme.selectedLineIdx].yPos = currentYPos
    return gMeme
}

function moveTextRight() {
    let currentMeme = getCurrentMeme()
    let currentXPos = currentMeme.textProps[currentMeme.selectedLineIdx].xPos
    if (currentXPos >= 0.85) currentXPos = 0.85
    else currentXPos += 0.05
    gMeme.textProps[currentMeme.selectedLineIdx].xPos = currentXPos
    return gMeme
}

function moveTextLeft() {
    let currentMeme = getCurrentMeme()
    let currentXPos = currentMeme.textProps[currentMeme.selectedLineIdx].xPos
    if (currentXPos === 0.80) currentXPos = 0.80
    else if (currentXPos === 0.15) currentXPos = 0.15
    else if (currentXPos > 0.80 || currentXPos > 0.20) currentXPos -= 0.05
    gMeme.textProps[currentMeme.selectedLineIdx].xPos = currentXPos
    return gMeme
}

function textColorPicker(color) {
    let currentMeme = getCurrentMeme()
    gMeme.textProps[currentMeme.selectedLineIdx].color = color
    return gMeme
}

function textAlignRight() {
    let currentMeme = getCurrentMeme()
    gMeme.textProps[currentMeme.selectedLineIdx].xPos = 0.85
    return gMeme
}

function textAlignLeft() {
    let currentMeme = getCurrentMeme()
    gMeme.textProps[currentMeme.selectedLineIdx].xPos = 0.15
    return gMeme
}

function textAlignCenter() {
    let currentMeme = getCurrentMeme()
    gMeme.textProps[currentMeme.selectedLineIdx].xPos = 0.50
    return gMeme
}

function handleCanvasClick(canvasHeight, yPos) {
    let currentMeme = getCurrentMeme()
    currentMeme.textProps.forEach(line => {
        if (line.yPos - yPos < line.fontSize / canvasHeight && line.yPos - yPos > 0) {
            currentMeme.selectedLineIdx = line.lineIdx
            onLineToggle(line)
        }
    })
}