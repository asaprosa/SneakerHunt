cd ../backend
start npm run dev
%SendKeys% {Enter}
cd ../scheduler
timeout /t 10 /nobreak
start python scheduler.py