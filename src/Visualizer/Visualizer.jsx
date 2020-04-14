import React from "react";
import "./Visualizer.css";

import { AppBar, Toolbar, Typography, Paper, Grid, CardContent, CardActions, Button, FormControl, Select, MenuItem, Slider, MuiThemeProvider, Switch, createMuiTheme, CssBaseline } from "@material-ui/core";

import { getBubbleSortAnimations } from "../Algorithms/bubbleSort";
import { getMergeSortAnimations } from "../Algorithms/mergeSort";
import { getQuickSortAnimations } from "../Algorithms/quickSort";
import { getInsertionSortAnimations } from "../Algorithms/insertionSort";
import { getSelectionSortAnimations } from "../Algorithms/selectionSort";


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const algorithmList = ["Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort"];
let selectedAlgorithm = "Bubble Sort";
let animationSpeed = 100;
let animationSpeedMS = 1;
let numberOfBars = 150;
let isSorting = false;
const colorList = ["DarkSlateBlue", "DarkSlateGray", "DodgerBlue", "Gold", "LightGreen", "LightSlateGray", "Orange", "Turquoise"];
let primaryColor = "DarkSlateBlue";
const secondaryColor = "#f50057";
let themeMode = "Light";
let darkMode = false;

export default class Visualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visualizerArray: []
        };
    }

    componentDidMount() {
        this.randomizeArray();
        document.getElementById("overview-title").innerHTML = "Bubble Sort";
        document.getElementById("overview-text").innerHTML = "Bubble sort is a simple sorting algorithm that repeatedly swaps adjacent elements if they are in the incorrect order, it is known as bubble sort, because with every complete iteration the largest element in the array, “bubbles up” towards the highest index of that array.";
        document.getElementById("overview-worst").innerHTML = "O(n" + "2".sup() + ")";
        document.getElementById("overview-average").innerHTML = "O(n" + "2".sup() + ")";
        document.getElementById("overview-best").innerHTML = "O(n)";
        document.getElementById("overview-space").innerHTML = "O(1)";
    }

    sorter(algorithm) {
        this.setIsSorting();
        switch (algorithm) {
            case "Bubble Sort": {
                this.bubbleSort();
                break;
            }
            case "Selection Sort": {
                this.selectionSort();
                break;
            }
            case "Insertion Sort": {
                this.insertionSort();
                break;
            }
            case "Merge Sort": {
                this.mergeSort();
                break;
            }
            case "Quick Sort": {
                this.quickSort();
                break;
            }
            default: {
                console.log(`${algorithm} is invalid`);
            }
        }
    }

    randomizeArray() {
        const array = [];
        for (let i = 0; i < numberOfBars; i++) {
            array.push(randomInt(50, 300));
        }
        this.setState({ visualizerArray: array });
    }

    setAlgorithm = (e) => {
        selectedAlgorithm = e.target.value;
        switch (e.target.value) {
            case "Bubble Sort": {
                document.getElementById("overview-title").innerHTML = "Bubble Sort";
                document.getElementById("overview-text").innerHTML = "Bubble sort is a simple sorting algorithm that repeatedly swaps adjacent elements if they are in the incorrect order, it is known as bubble sort, because with every complete iteration the largest element in the array, “bubbles up” towards the highest index of that array.";
                document.getElementById("overview-worst").innerHTML = "O(n" + "2".sup() + ")";
                document.getElementById("overview-average").innerHTML = "O(n" + "2".sup() + ")";
                document.getElementById("overview-best").innerHTML = "O(n)";
                document.getElementById("overview-space").innerHTML = "O(1)";
                break;
            }
            case "Selection Sort": {
                document.getElementById("overview-title").innerHTML = "Selection Sort";
                document.getElementById("overview-text").innerHTML = "Selection sort is an in-place comparison-based algorithm in which an array is divided into two parts, the sorted part, and the unsorted part. The smallest element is selected from the unsorted array and swapped with the leftmost element of the unsorted array, that element then becomes a part of the sorted array. This process continues until there are no elements in the unsorted part.";
                document.getElementById("overview-worst").innerHTML = "O(n" + "2".sup() + ")";
                document.getElementById("overview-average").innerHTML = "O(n" + "2".sup() + ")";
                document.getElementById("overview-best").innerHTML = "O(n" + "2".sup() + ")";
                document.getElementById("overview-space").innerHTML = "O(1)";
                break;
            }
            case "Insertion Sort": {
                document.getElementById("overview-title").innerHTML = "Insertion Sort";
                document.getElementById("overview-text").innerHTML = "Insertion sort is an in-place comparison-based algorithm that builds the final sorted array one item at a time. At each iteration, insertion sort removes one element from the unsorted array, finds the location it belongs to within the sorted array, and inserts it there. This process repeats until no unsorted elements remain.";
                document.getElementById("overview-worst").innerHTML = "O(n" + "2".sup() + ")";
                document.getElementById("overview-average").innerHTML = "O(n" + "2".sup() + ")";
                document.getElementById("overview-best").innerHTML = "O(n)";
                document.getElementById("overview-space").innerHTML = "O(1)";
                break;
            }
            case "Merge Sort": {
                document.getElementById("overview-title").innerHTML = "Merge Sort";
                document.getElementById("overview-text").innerHTML = "Merge sort is a divide and conquer algorithm that continually divides an array into subarrays, until each subarray is composed of a single element. It then merges those subarrays to produce a sorted array.";
                document.getElementById("overview-worst").innerHTML = "O(n log n)";
                document.getElementById("overview-average").innerHTML = "O(n log n)";
                document.getElementById("overview-best").innerHTML = "O(n log n)";
                document.getElementById("overview-space").innerHTML = "O(n)";
                break;
            }
            case "Quick Sort": {
                document.getElementById("overview-title").innerHTML = "Quick Sort";
                document.getElementById("overview-text").innerHTML = "Quick sort is a divide and conquer algorithm. It selects a pivot, and partitions around that pivot, dividing the array into smaller sub-arrays. It continues to do this until the array is sorted.";
                document.getElementById("overview-worst").innerHTML = "O(n" + "2".sup() + ")";
                document.getElementById("overview-average").innerHTML = "O(n log n)";
                document.getElementById("overview-best").innerHTML = "O(n log n)";
                document.getElementById("overview-space").innerHTML = "O(logn)";
                break;
            }
            default: {
                console.log(`${e.target.value} is invalid`);
            }
        }
        this.forceUpdate();
    }

    bubbleSort() {
        this.randomizeArray();
        const animations = getBubbleSortAnimations(this.state.visualizerArray);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (i % 4 === 0) || (i % 4 === 1);
            const arrayBars = document.getElementsByClassName("array-bar");
            if (isColorChange) {
                const color = (i % 4 === 0) ? secondaryColor : primaryColor;
                const [barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * animationSpeedMS);
            } else {
                const [barIndex, newHeight] = animations[i];
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                }, i * animationSpeedMS);
            }
        }
        const restoreTime = parseInt(animationSpeedMS * animations.length);
        setTimeout(() => this.setIsSorting(), restoreTime);
    }

    selectionSort() {
        this.randomizeArray();
        const animations = getSelectionSortAnimations(this.state.visualizerArray);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (i % 4 === 0) || (i % 4 === 1);
            const arrayBars = document.getElementsByClassName("array-bar");
            if (isColorChange) {
                const color = (i % 4 === 0) ? secondaryColor : primaryColor;
                const [barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * animationSpeedMS);
            } else {
                const [barIndex, newHeight] = animations[i];
                if (barIndex === false) {
                    continue;
                }
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                }, i * animationSpeedMS);
            }
        }
        const restoreTime = parseInt(animationSpeedMS * animations.length);
        setTimeout(() => this.setIsSorting(), restoreTime);
    }

    insertionSort() {
        this.randomizeArray();
        const animations = getInsertionSortAnimations(this.state.visualizerArray);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (i % 4 === 0) || (i % 4 === 1);
            const arrayBars = document.getElementsByClassName("array-bar");
            if (isColorChange) {
                const color = (i % 4 === 0) ? secondaryColor : primaryColor;
                const [barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * animationSpeedMS);
            } else {
                const [barIndex, newHeight] = animations[i];
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                }, i * animationSpeedMS);
            }
        }
        const restoreTime = parseInt(animationSpeedMS * animations.length);
        setTimeout(() => this.setIsSorting(), restoreTime);
    }


    mergeSort() {
        this.randomizeArray();
        const animations = getMergeSortAnimations(this.state.visualizerArray);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName("array-bar");
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                const color = i % 3 === 0 ? secondaryColor : primaryColor;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * animationSpeedMS);
            } else {
                setTimeout(() => {
                    const [barOneIndex, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIndex].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * animationSpeedMS);
            }
        }
        const restoreTime = parseInt(animationSpeedMS * animations.length);
        setTimeout(() => this.setIsSorting(), restoreTime);
    }

    quickSort() {
        this.randomizeArray();
        const animations = getQuickSortAnimations(this.state.visualizerArray);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (i % 6 === 0) || (i % 6 === 1);
            const arrayBars = document.getElementsByClassName("array-bar");
            if (isColorChange) {
                const color = (i % 6 === 0) ? secondaryColor : primaryColor;
                const [barOneIndex, barTwoIndex] = animations[i];
                if (barOneIndex === false) {
                    continue;
                }
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * animationSpeedMS);
            } else {
                const [barIndex, newHeight] = animations[i];
                if (barIndex === false) {
                    continue;
                }
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                }, i * animationSpeedMS);
            }
        }
        const restoreTime = parseInt(animationSpeedMS * animations.length);
        setTimeout(() => this.setIsSorting(), restoreTime);
    }

    setAnimationSpeed = (e, value) => {
        animationSpeed = value;
        animationSpeedMS = value * -1 + 101;
        this.forceUpdate();
    }

    setNumberOfBars = (e, value) => {
        numberOfBars = value;
        this.randomizeArray();
    }

    setPrimaryColor = (e) => {
        primaryColor = e.target.value;
        this.forceUpdate();
    }

    setThemeMode = (e, value) => {
        darkMode = value;
        if (value) {
            themeMode = "Dark";
        } else {
            themeMode = "Light";
        }
        this.forceUpdate();
    }

    setIsSorting = () => {
        isSorting = !isSorting;
        if (isSorting === false) {
            this.forceUpdate();
        }
    }

    render() {
        const array = this.state.visualizerArray;
        const white = {
            color: "white"
        };
        const primaryThemeColor = {
            color: `${primaryColor}`
        }
        const primaryBackgroundColor = {
            background: `${primaryColor}`
        }
        const darkTheme = createMuiTheme({
            palette: {
                type: "dark"
            }
        });
        const lightTheme = createMuiTheme({
            palette: {
                type: "light"
            }
        });
        return (
            <div>
                <MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                    <AppBar style={primaryBackgroundColor} position="static">
                        <Toolbar>
                            <Typography variant="h6">Sorting Visualizer</Typography>
                            <div className="theme-section">
                                <FormControl disabled={isSorting}>
                                    <Typography>Select a Color</Typography>
                                    <Select style={white} value={primaryColor} onChange={this.setPrimaryColor}>
                                        {colorList.map((index) => <MenuItem value={index} key={index}>{index}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <div>
                                    <Typography>{themeMode}</Typography>
                                    <Switch disabled={isSorting} color="secondary" onChange={this.setThemeMode} />
                                </div>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <CssBaseline></CssBaseline>
                    <Paper elevation={3} className="array-container">
                        {array.map((value, index) => (
                            <div
                                className="array-bar"
                                key={index}
                                style={{
                                    backgroundColor: primaryColor,
                                    height: `${value}px`,
                                    width: `${1000 / numberOfBars}px`
                                }}></div>
                        ))}
                    </Paper>
                    <Grid container>
                        <Grid item sm={4}>
                            <Paper elevation={3} className="Paper">
                                <CardContent>
                                    <Typography align={"left"}>Select a Algorithm</Typography>
                                    <FormControl className="menu-dropdown" disabled={isSorting}>
                                        <Select value={selectedAlgorithm} onChange={this.setAlgorithm}>
                                            {algorithmList.map((index) => <MenuItem value={index} key={index}>{index}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <Typography align={"left"}>Speed</Typography>
                                    <Slider style={primaryThemeColor} value={animationSpeed} onChange={this.setAnimationSpeed} disabled={isSorting} min={1} max={100} valueLabelDisplay="auto" />
                                    <Typography align={"left"}>Number of Bars</Typography>
                                    <Slider style={primaryThemeColor} value={numberOfBars} onChange={this.setNumberOfBars} disabled={isSorting} min={5} max={150} valueLabelDisplay="auto" />
                                </CardContent>
                                <CardActions>
                                    <div className="menu-button">
                                        <Button disabled={isSorting} onClick={() => this.sorter(selectedAlgorithm)}>Sort</Button>
                                    </div>
                                </CardActions>
                            </Paper>
                        </Grid>
                        <Grid item sm={5}>
                            <Paper elevation={3} className="Paper overview-container">
                                <div className="overview-section">
                                    <Typography><strong id="overview-title">Select an algorithm in the dropdown menu</strong></Typography>
                                    <Typography id="overview-text"></Typography>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item sm={3}>
                            <Paper elevation={3} className="Paper overview-container">
                                <div className="overview-aside">
                                    <Typography>Worst-case time complexity: <span id="overview-worst">N/A</span></Typography>
                                    <Typography>Average time complexity: <span id="overview-average">N/A</span></Typography>
                                    <Typography>Best-case time complexity: <span id="overview-best">N/A</span></Typography>
                                    <Typography>Worst-case space complexity: <span id="overview-space">N/A</span></Typography>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </MuiThemeProvider>
            </div>
        );
    }
}