# doodle-digit-classifier

Train a model to recognize hand-written digits using the MNIST dataset and Keras and TensorFlow, convert to a TensorFlowJS model and import it to a webpage to classify digits drawn by the user!

## Deployment
To run this app locally you could set up a node server to host the tfjs model files (as the TensorFlow `loadLayersModel` function expects to retrieve a model over http request). I opted to use the npm module [http-server]('https://www.npmjs.com/package/http-server') for simplicity.

Steps:
1. Clone the directory and install http-server using:
`npm install http-server -g`
2. Navigate to the project directory on your command line/terminal and deploy the server using:
`http-server -c1 --cors .`
3. Open the `index.html` file using your favourite browser and voila!

## Model Development
This model script is developed for Python 3.6.8. To run the `build_model.py` file it is recommended to either use a Docker container or a package manager such as Conda to ensure the correct Python version and to install dependencies.

### Docker
The following [Docker image]('https://hub.docker.com/r/evenchange4/docker-tfjs-converter') will set up a container with the correct Python version and all required dependencies:

`docker pull evenchange4/docker-tfjs-converter`

Running it with the following command will set the output format for the TensorFlow models:

`docker run -it --rm \
  -v "$PWD/python:/python" \
  evenchange4/docker-tfjs-converter \
  tensorflowjs_converter --input_format=keras python/output/model.h5 python/output/model-tfjs
`


### Conda
To train the model using Conda first ensure the Python version is correct:
`conda install python=3.6.8`

then install the recquired packages, e.g:

`pip install --user tensorflowjs`