'use strict'

var gImages = []

const SIZE = 25

var gKeyWords = ['HAPPY', 'ANIMAL', 'SPORT', 'CARTOON', 'HOLYWOOD', 'ALL']

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
    for (let i = 0; i < image.keyWords.length; i++) if (image.keyWords[i].includes(keyWord)) return image
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
    let happyKeys = [1, 3, 6, 8, 11, 12, 24]
    checkingEachKeyWords(happyKeys, 'HAPPY')
    let animalKeys = [4, 7, 14]
    checkingEachKeyWords(animalKeys, 'ANIMAL')
    let sportKeys = [20, 21, 23]
    checkingEachKeyWords(sportKeys, 'SPORT')
    let cartoonKeys = [0, 2, 3, 6, 7, 9, 14, 15, 18]
    checkingEachKeyWords(cartoonKeys, 'CARTOON')
    let hollywoodKeys = [5, 8, 10, 11, 12, 13, 16, 22, 24]
    checkingEachKeyWords(hollywoodKeys, 'HOLYWOOD')
}

function checkingEachKeyWords(keys, word) {
    for (let i = 0; i < keys.length; i++) _setKeyWord(keys[i], word)
}

function _setKeyWord(idx, keyWord) {
    gImages[idx].keyWords.push(keyWord)
}
