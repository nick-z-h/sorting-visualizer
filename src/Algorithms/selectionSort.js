export function getSelectionSortAnimations(array) {
    const animations = [];
    selectionSortHelper(array, animations);
    return animations;
}

function selectionSortHelper(array, animations) {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        let min = array[i];
        for (let j = i + 1; j < n; j++) {
            animations.push([i, j]);
            animations.push([i, j]);
            animations.push([false, false]);
            animations.push([false, false]);
            if (array[j] < min) {
                min = array[j];
                minIndex = j;
            }
        }
        animations.push([i, minIndex]);
        animations.push([i, minIndex]);
        animations.push([i, min]);
        animations.push([minIndex, array[i]]);
        let temp = array[i];
        array[i] = min;
        array[minIndex] = temp;
    }
}