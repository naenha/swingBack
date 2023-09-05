# -*- coding: utf-8 -*-
import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np
import sys

# 모델 로드
from keras.models import load_model
model_tr = load_model('./VGG16_tr_epoch50.h5')

classes = ["raccoon", "roe deer", "water deer", "wild boar"]

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python image_classification.py <image_path>")
        sys.exit(1)

    image_path = sys.argv[1]

    # 이미지 로드
    x = tf.keras.preprocessing.image.load_img(image_path, target_size=(224, 224))
    x = tf.keras.preprocessing.image.img_to_array(x) / 255.0
    x = np.expand_dims(x, axis=0)

    # 예측 수행
    pred = model_tr.predict(x)
    pred_index = np.argmax(pred, axis=1)[0]
    predicted = classes[pred_index]

    print(predicted)
