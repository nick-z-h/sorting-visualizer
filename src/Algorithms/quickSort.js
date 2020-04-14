export function getQuickSortAnimations(array) {
    const animations = [];
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

function quickSortHelper(array, startIndex, endIndex, animations) {
    let pivotIndex;
    if (startIndex < endIndex) {
        pivotIndex = partitionArray(array, startIndex, endIndex, animations);
        quickSortHelper(array, startIndex, pivotIndex - 1, animations);
        quickSortHelper(array, pivotIndex + 1, endIndex, animations);
    }
}

function partitionArray(array, startIndex, endIndex, animations) {
    let pivot = array[endIndex];
    let pivotIndex = startIndex;
    for (let i = startIndex; i <= endIndex - 1; i++) {
        animations.push([i, endIndex]);
        animations.push([i, endIndex]);
        if (array[i] <= pivot) {
            animations.push([i, array[pivotIndex]]);
            animations.push([pivotIndex, array[i]]);
            let temp = array[i];
            array[i] = array[pivotIndex];
            array[pivotIndex] = temp;
            pivotIndex++;
        }
        else {
            animations.push([false, false]);
            animations.push([false, false]);
        }
        animations.push([false, false]);
        animations.push([false, false]);
    }
    animations.push([false, false]);
    animations.push([false, false]);
    animations.push([false, false]);
    animations.push([false, false]);
    animations.push([pivotIndex, array[endIndex]]);
    animations.push([endIndex, array[pivotIndex]]);
    let temp = array[pivotIndex];
    array[pivotIndex] = array[endIndex];
    array[endIndex] = temp;
    return pivotIndex;
}