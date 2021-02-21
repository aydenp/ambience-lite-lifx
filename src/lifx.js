const Lifx = require('node-lifx-lan');

/// Utility function for setting all 8 colours of the strip at once using an array
const batchSetLifxMultiZoneColours = async (device, colours) => {
    for (let [index, val] of colours.entries()) {
        const isLast = index >= colours.length - 1;
        await device.multiZoneSetColorZones({
            start: index,
            end: index,
            color: val,
            duration: 300,
            apply: isLast ? 1 : 0
        });
    }
}

module.exports = { Lifx, batchSetLifxMultiZoneColours }