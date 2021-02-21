const robot = require("robotjs");
const { rgbToHSB } = require('./util');

const getScreenColours = () => {
    const averageColourFromCapture = (screen, xStart, xEnd) => {
        const x1 = xStart || 0, x2 = xEnd || screen.width;
        var r = 0, g = 0, b = 0;
        for (var sx=x1; sx<x2; sx++) {
            for (var sy=0; sy<screen.height; sy++) {
                var index = (sy * screen.byteWidth) + (sx * screen.bytesPerPixel);
                b += screen.image[index];
                g += screen.image[index+1];
                r += screen.image[index+2];
            }
        }
        const sum = (x2 - x1) * screen.height;
        return [r / sum, g / sum, b / sum];
    }

    var colours = [];

    // Capture a 100px tall image of the bottom of the screen
    const size = robot.getScreenSize();
    const areaHeight = 100;
    const img = robot.screen.capture(0, size.height - areaHeight, size.width, areaHeight);

    // Divide the pixels into 8 columns and get their average colours
    const portionSize = img.width / 8;
    for (var i = 0; i < 8; i++) {
        var colour = averageColourFromCapture(img, i * portionSize, (i + 1) * portionSize - 1);
        colours.push(rgbToHSB(colour));
    }
    return colours;
}

module.exports = getScreenColours;