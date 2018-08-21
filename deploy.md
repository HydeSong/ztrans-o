ssh root@47.97.168.223
password CX3@yatai

cd /usr/local/

yarn build && cd dist && tar -c * | ssh 47.97.168.223 -l root "cd /usr/local/ && rm -rf cx && mkdir cx && cd cx && tar -xv && nginx -s reload"
