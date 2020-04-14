export function getMergeSortAnimations(array) {
    const animations = [];
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIndex,
    endIndex,
    auxiliaryArray,
    animations,
) {
    if (startIndex === endIndex) {
        return;
    }
    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    mergeSortHelper(auxiliaryArray, startIndex, middleIndex, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIndex + 1, endIndex, mainArray, animations);
    doMerge(mainArray, startIndex, middleIndex, endIndex, auxiliaryArray, animations);
}

function doMerge(
    mainArray,
    startIndex,
    middleIndex,
    endIndex,
    auxiliaryArray,
    animations,
) {
    let g = startIndex;
    let i = startIndex;
    let j = middleIndex + 1;
    while (i <= middleIndex && j <= endIndex) {
        animations.push([i, j]);
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push([g, auxiliaryArray[i]]);
            mainArray[g++] = auxiliaryArray[i++];
        } else {
            animations.push([g, auxiliaryArray[j]]);
            mainArray[g++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIndex) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([g, auxiliaryArray[i]]);
        mainArray[g++] = auxiliaryArray[i++];
    }
    while (j <= endIndex) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([g, auxiliaryArray[j]]);
        mainArray[g++] = auxiliaryArray[j++];
    }
}