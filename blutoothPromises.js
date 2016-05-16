//this code works for sure. It's straight off of the web bluetooth api

function onButtonClick() {
  navigator.bluetooth.requestDevice(
    {filters: [{services: ['battery_service']}]})
  .then(device => {

    return device.gatt.connect();
  })
  .then(server => {
    return server.getPrimaryService('battery_service');
  })
  .then(service => {
    return service.getCharacteristic('battery_level');
  })
  .then(characteristic => {
    return characteristic.readValue();
  })
  .then(value => {
    log('> Battery Level is ' + batteryLevel + '%');
  })
  .catch(error => {
    log('Argh! ' + error);
  });
}

//this is a modification of the above code with error messages. It is untested.

function onButtonClick () {
  navigator.bluetooth.requestDevice({
    filters: [{services: ['battery_service']}]
  }).then(function connect (device){
    return device.gatt.connect();
  }, function requestDeviceError(err){
    if(err){
      throw new Error('could not find device');
    }
  }).then(function getService(server){
    return server.getPrimaryService('battery_service');
  }, function connectError (err){
    if(err){
      throw new Error('could not connect to device');
    }
  }).then(function getChar (service){
    return service.getCharacteristic('battery_service');
  }, function getServiceError(err){
    if(err){
      throw new Error('could not find specified service on device');
    }
  }).then(function readVal(characteristic){
    return characteristic.readValue();
  }, function getCharError(err){
    if(err){
      throw new Error('could not find specified characteristc on service');
    }
  }).then(function display (val){
    console.log('battery level is'+val+'%');
  }, function readValError (err){
    if(err){
      throw new Error('could not read characteristic value');
    }
  });
}

