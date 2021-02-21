# ambience-lite-lifx

A very lightweight Node.js script to influence a Lifx lighstrip using the colours from your computer's display, creating an ambient extension of your monitor.

I wrote this in about 10 minutes at midnight, so it might not be the best code, and it definitely isn't performant. Running it might slow your computer a bit.

This may not work with all Lifx products. I have only tested with a LIFX Z lightstrip. Your results may vary.

## How it works

Lifx lights have an API that allows devices on your network to communicate with them over LAN. This script leverages that API to set the colours on your light. Lifx lightstrips also have multiple colour 'zones' that can be set with a given colour. This feature is great for Ambience, as it allows it to echo your computer screen better than a lightstrip with only one colour at a time.

This script gets the bottom pixels of your computer screen a few times a second, divides it into 8 'zones', and calculates the average colour of these zones. It then sends this colour to the Lifx device with a fade animation.

## Getting started

Simply clone this repository, install the dependencies using `npm i`, and start the script using `npm run start`. You will be asked which Lifx device to use.

If you want to set a preconfigured device to use (such as for non-interactive uses), you can use the environment variables `LIFX_DEVICE_MAC` and `LIFX_DEVICE_IP` like so:

```bash
LIFX_DEVICE_MAC=A1:B2:C3:D4:E5:F6 LIFX_DEVICE_IP=10.3.4.54 npm run start
```

If you don't know the MAC and IP address of your lights, don't worry: the script will suggest the environment variables for future uses once you select a device.

## Troubleshooting

If you can't get it to work, verify the following:

1. You've followed all the steps in [Getting started](#getting-started).
2. Your lights are multi-zone (can display multiple colours at once).
3. Your computer and light are on the same network (LAN).
4. Your lights aren't currently displaying any preset theme (you can check & disable these in the Lifx mobile app).
5. Your lights are on the latest firmware.

If you still can't get it to work, feel free to email me! If you think it's a bug or other code-related issue, see below.

## Reporting Issues

If you find a bug or code issue, report it on the [issues page](/issues).

## Contributing

Feel free to contribute to the source code to make it something even better! Just try to adhere to the general coding style throughout, to make it as readable as possible.

## License

This project is licensed under the [MIT license](/LICENSE). Please make sure you comply with its terms while using it in any way.