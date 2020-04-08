'use strict'

var gImages = []
var gKeyWords = ['HAPPY', 'ANIMAL', 'SPORT', 'CARTOON', 'HOLYWOOD', 'ALL']

const SIZE = 25

function createImages() {
    for (let i = 1; i <= SIZE; i++) {
        let memeImage = _createImage(i)
        gImages.push(memeImage)
    }
    _setKeyWords()
}

function getImages() {
    return gImages
}

function getImageById(imageId) {
    return gImages.find(image => image.id === imageId)
}

function getImageByKeyWord(image, keyWord) {
    let keyWordToUpperCase = keyWord.toUpperCase()
    for (let i = 0; i < image.keyWords.length; i++) if (image.keyWords[i].includes(keyWordToUpperCase)) return image
    return null
}

function getKeyWords() {
    return gKeyWords
}

function getImageKeyWords(image) {
    return image.keyWords
}

function _createImage(image) {
    return {
        id: image++,
        keyWords: ['ALL']
    }
}

function _setKeyWords() {
    let happyKeys = [3, 6, 8, 11, 12, 24]
    _checkingEachKeyWords(happyKeys, 'HAPPY')
    let animalKeys = [4, 7, 14]
    _checkingEachKeyWords(animalKeys, 'ANIMAL')
    let sportKeys = [1, 20, 21, 23]
    _checkingEachKeyWords(sportKeys, 'SPORT')
    let cartoonKeys = [0, 2, 3, 6, 7, 9, 14, 15, 18]
    _checkingEachKeyWords(cartoonKeys, 'CARTOON')
    let hollywoodKeys = [5, 8, 10, 11, 12, 13, 16, 22, 24]
    _checkingEachKeyWords(hollywoodKeys, 'HOLYWOOD')
}

function _checkingEachKeyWords(keys, word) {
    for (let i = 0; i < keys.length; i++) _setKeyWord(keys[i], word)
}

function _setKeyWord(idx, keyWord) {
    gImages[idx].keyWords.push(keyWord)
}
