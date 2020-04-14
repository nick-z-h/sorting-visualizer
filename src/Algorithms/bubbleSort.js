export function getBubbleSortAnimations(array) {
    const animations = [];
    bubbleSortHelper(array, animations);
    return animations;
}

function bubbleSortHelper(array, animations) {
    const n = array.length;
    let swapped = false;
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                animations.push([j, j + 1]);
                animations.push([j, j + 1]);
                animations.push([j, array[j + 1]]);
                animations.push([j + 1, array[j]]);
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                swapped = true;
            }
        }
        if (swapped === false) {
            break;
        }
    }
}