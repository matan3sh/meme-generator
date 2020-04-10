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

function deleteLine(currentMeme) {
    currentMeme.textProps[currentMeme.selectedLineIdx].content = ''
}