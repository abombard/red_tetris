sshpass -p iYqDG8REby ssh hadopire@dalet.pw '
cd red_tetris
git reset --hard
git fetch origin
git rebase origin/master
npm install
npm run client-dist
pkill node
sleep 1
nohup npm run srv-dev > /dev/null 2>&1 &
exit
'
