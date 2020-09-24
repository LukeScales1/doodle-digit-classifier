
from tensorflow import keras
import tensorflowjs as tfjs

mnist = keras.datasets.mnist
(train_images, train_labels), (test_images, test_labels) = mnist.load_data()


train_images = train_images.reshape(train_images.shape[0], 28, 28, 1)
test_images  = test_images.reshape(test_images.shape[0], 28, 28, 1)
train_images = train_images / 255.0
test_images = test_images / 255.0

model = keras.Sequential([
    keras.layers.Flatten(input_shape=(28, 28, 1)),
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

model.fit(train_images, train_labels, epochs=10)

test_loss, test_acc = model.evaluate(test_images,  test_labels, verbose=2)

print('\nTest accuracy:', test_acc)

import time
t = time.time()

from pathlib import Path

export_path = Path('\saved_models\{}'.format(int(t)))

model.save(export_path, save_format='tf')



# export_path

#
# pip install tensorflowjs
#
#
#
# get_ipython().system('tensorflowjs_converter     --input_format=keras_saved_model     /tmp/saved_models/1576816463     /tmp/my_tfjs_model')
#
#
#
# tensorflowjs_converter     --input_format=keras_saved_model     /tmp/saved_models/1576816463     /tmp/my_tfjs_model
#
#
#
# cd "mnist_model/"
#
#
# ls
#
#
# cd "assets/"
#
#
# ls
#
#
#
# ls .*
#
#
#
# reloaded = tf.keras.models.load_model(export_path)
#
#
#
# result_batch = model.predict(img)
# reloaded_result_batch = reloaded.predict(img)
#
#
# abs(reloaded_result_batch - result_batch).max()
#
#
#
# get_ipython().system('tar cvfz zipname.tar.gz *')
#



