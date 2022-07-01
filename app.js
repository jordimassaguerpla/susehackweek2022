async function run() {
  // Import model
  image = document.getElementById("example_image");
  const model = await tf.loadLayersModel('http://localhost/ml/saved_model.tfjs/model.json');
  // Infere
  canvas = document.getElementById("canvas_1");
  // Normalize
  training_avg = 126.0662;
  training_stdev = 63.458977;
  // resizeBilinear given this is the default for Keras https://keras.io/api/preprocessing/image/
  tensorImg = tf.browser.fromPixels(image).resizeBilinear([320, 320]).toFloat().sub(tf.scalar(training_avg)).div(tf.scalar(training_stdev));
  const prediction = model.predict(tensorImg.expandDims());
  prediction_data = prediction.dataSync();
  document.getElementById("prediction").innerText = " Cardiomegaly: " + prediction_data[0] + "\n Mass: " + prediction_data[5] + "\n Pneumotorax: " + prediction_data[8] + "\n Edema: " + prediction_data[12];
}

run();
