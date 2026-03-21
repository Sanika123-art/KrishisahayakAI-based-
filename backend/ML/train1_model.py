import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# dataset path
dataset_path = "Datasets"

# preprocess images
datagen = ImageDataGenerator(rescale=1.0/255)

# training data
train_data = datagen.flow_from_directory(
    dataset_path,
    target_size=(128,128),
    batch_size=32,
    class_mode='categorical'
)

# print classes
print("Classes:", train_data.class_indices)

# create CNN model
model = tf.keras.models.Sequential([

    tf.keras.layers.Input(shape=(128,128,3)),

    tf.keras.layers.Conv2D(32,(3,3),activation='relu'),
    tf.keras.layers.MaxPooling2D(2,2),

    tf.keras.layers.Conv2D(64,(3,3),activation='relu'),
    tf.keras.layers.MaxPooling2D(2,2),

    tf.keras.layers.Conv2D(128,(3,3),activation='relu'),
    tf.keras.layers.MaxPooling2D(2,2),

    tf.keras.layers.Flatten(),

    tf.keras.layers.Dense(128,activation='relu'),

    tf.keras.layers.Dense(train_data.num_classes,activation='softmax')
])

# compile
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# train
model.fit(train_data, epochs=5)

# save model
model.save("crop_model.h5")

print("Model saved successfully")
