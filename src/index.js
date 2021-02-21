const prompts = require("prompts");
const { Lifx, batchSetLifxMultiZoneColours } = require('./lifx');
const getScreenColours = require("./screen");

const tick = async (device) => {
    try {
        const colours = getScreenColours().map(c => {
            // Convert to lifx library formatted colour
            return { hue: c[0], saturation: c[1], brightness: c[2] * 0.25, kelvin: 3500 };
        }).reverse();
        // Send colour to lights
        await batchSetLifxMultiZoneColours(device, colours);
    } catch (e) {
        console.error("Error while sending colours:", e);
    }
    // Repeat in 50ms
    setTimeout(() => tick(device), 50);
}

(async () => {
    const getDevice = async () => {
        // Check if user specified using environment variables
        if (process.env["LIFX_DEVICE_MAC"] && process.env["LIFX_DEVICE_IP"]) {
            return await Lifx.createDevice({
                mac: process.env["LIFX_DEVICE_MAC"],
                ip: process.env["LIFX_DEVICE_IP"]
            });
        }
        console.log("Searching for devices…");
        const devices = await Lifx.discover();
        const { device } = await prompts([{
            type: "select",
            name: "device",
            message: "Select a device",
            choices: devices.map(d => {
                return { title: d.deviceInfo.label, value: d, description: `${d.deviceInfo.productName} - ${d.ip}/${d.mac}` }
            })
        }]);
        console.log(`TIP: In the future, you can skip the device selection by placing 'LIFX_DEVICE_MAC=${device.mac} LIFX_DEVICE_IP=${device.ip}' before the script.`)
        return device;
    };
    const device = await getDevice();
    console.log("Turning the device on…");
    await device.turnOn();
    console.log("Starting…");
    // Start the loop
    await tick(device);
})();