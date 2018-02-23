import cv2
import numpy as np
import requests
import time
import pigpio
recognizer = cv2.face.createLBPHFaceRecognizer()
recognizer.load('trainner/trainner.yml')
cascadePath = "haarcascade_frontalface_default.xml"
faceCascade = cv2.CascadeClassifier(cascadePath);
attendarr = [0,0,0,0,0,0,0,0,0,0]

pi = pigpio.pi()
pi.set_mode(18,pigpio.INPUT)
pi.set_pull_up_down(18, pigpio.PUD_DOWN)

#r = requests.get("http://localhost/attendance")
#print(r.content)
def keydetect():
	print("waiting key press")
	while(1):
		status = pi.read(18)
		if status == True:
			imgpro()
		time.sleep(.01)

def updatedata(arr):
	print("Updating DB")
	strin = str(arr)
	url = "http://localhost/record?arr=" + strin
	r = requests.get(url)
	print(r.content)
def imgpro():
	print("Camera initialising")
	cam = cv2.VideoCapture(0)
	font = cv2.FONT_HERSHEY_SIMPLEX
	for x in range(0,60):
		print(x)
		ret, im =cam.read()
		if(ret == True):			
			print(str(attendarr))
			gray=cv2.cvtColor(im,cv2.COLOR_BGR2GRAY)
			faces=faceCascade.detectMultiScale(gray, 1.2,5)
			for(x,y,w,h) in faces:
				cv2.rectangle(im,(x,y),(x+w,y+h),(225,0,0),2)
				Id, conf = recognizer.predict(gray[y:y+h,x:x+w])
				if(conf<50):
					attendarr[Id]=1
					if(Id==1):
						Id="1"
					elif(Id==2):
						Id="2"
					elif(Id==3):
						Id="3"
					elif(Id==4):
						Id="4"
					elif(Id==5):
						Id="5"
					elif(Id==6):
						Id="6"
					elif(Id==7):
						Id="7"
					elif(Id==8):
						Id="8"
					elif(Id==9):
						Id="9"
					elif(Id==10):
						Id="10"
				else:
					Id="Unknown"
				#cv2.cv.PutText(cv2.cv.fromarray(im),str(Id), (x,y+h),font, 255)
				cv2.putText(im,str(Id), (x,y+h),font,1,(255, 255,255),2, cv2.LINE_AA)
			cv2.imshow('im',im)
			if cv2.waitKey(10) & 0xFF==ord('q'):
				quit()
		else:
			print("camera not detected")
			time.sleep(3)
			imgpro()
	cam.release()
	cv2.destroyAllWindows()
	updatedata(attendarr)
	keydetect()
	
keydetect()
