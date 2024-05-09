from flask import Flask, render_template, request, session, redirect, url_for, Response, jsonify
from PIL import Image
import numpy as np
import cv2
import os
import time
from datetime import date

# app = Flask(__name__)


# if __name__ == '__main__':
#     app.run(debug=True)
# video_capture = cv2.VideoCapture(cv2.CAP_V4L2)
video_capture = cv2.VideoCapture(0)

while True:
    ret, frame = video_capture.read()
    if cv2.waitKey(1) & 0xFF == ord('q'):
	    break

video_capture.release()
cv2.destroyAllWindows()