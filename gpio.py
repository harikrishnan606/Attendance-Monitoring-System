import time
import pigpio
pi = pigpio.pi()
pi.set_mode(18,pigpio.INPUT)
pi.set_pull_up_down(18, pigpio.PUD_DOWN)

while(1):
	print(pi.read(18))
	time.sleep(.01)
