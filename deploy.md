ssh root@47.97.168.223
password CX3@yatai

cd /usr/local/

yarn build && tar -cvf cx.tar dist/ && scp cx.tar root@47.97.168.223:/usr/local/

tar -xvf cx.tar && rm -rf cx && mkdir cx && mv dist/* cx/ && nginx -s reload