import os
import time

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

num_epochs = 100
LEARNING_RATE = 1e-3
DECAY = LEARNING_RATE / num_epochs

opt = keras.optimizers.Adam(lr=LEARNING_RATE, decay=DECAY)

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy', 'mse'])

t = time.time()
export_path = os.path.join('saved_model','hdf5', '{}'.format(int(t)))

checkpoint = keras.callbacks.ModelCheckpoint(export_path,
                          monitor='loss',
                          verbose=1,
                          save_best_only=True,
                          mode='auto')


H = model.fit(train_images, train_labels,
    epochs=num_epochs,
    shuffle=False,
    batch_size=32,
    use_multiprocessing=True,
    workers=8,
    callbacks=[
        checkpoint
        ]
)

test_loss, test_acc, test_mse = model.evaluate(test_images,  test_labels, verbose=2)

print('\nTest accuracy:', test_acc)

checkpointed_model = keras.models.load_model(export_path)

export_path_js = os.path.join('saved_model', 'tfjs', '{}'.format(int(t)))
tfjs.converters.save_keras_model(checkpointed_model, export_path_js)
