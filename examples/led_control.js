var five = require("johnny-five");
var Particle = require("particle-io");

var board = new five.Board({
  io: new Particle({
    token: '7ae40abd0f7c272888ca95b6740667febd1a29c8',
    deviceName: 'YOUR_DEVICE_NAME'
  })
});

board.on("ready", function() {

  var input = new five.Sensor("A0");
  var led = new five.Led(11);
  var initialValue;

  input.on("data", function() {
    if(initialValue === undefined) {
      initialValue = this.value;
    }

    setLed(this.value);
  });

  function setLed(value) {
    // sway +/- points to control the LED
    var sway = 50;
    var brightness = five.Fn.map(value, initialValue - sway, initialValue + sway, 0, 255);

    console.log("setting LED to " + brightness);
    led.brightness(brightness);
  }
});
