FROM ubuntu:latest

RUN apt-get update && apt-get install -y socat gcc gcc-multilib && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN useradd -U -m -s /bin/bash ctf

COPY ./chall.c /home/ctf/chall.c
COPY ./flag.txt /home/ctf/flag.txt
COPY ./canary.txt /home/ctf/canary.txt

RUN chown -R root:ctf /home/ctf && chmod -R 550 /home/ctf
RUN chmod 440 /home/ctf/flag.txt /home/ctf/canary.txt

WORKDIR /home/ctf/
RUN gcc chall.c -o chall -m32 -fno-stack-protector -Wl,-z,relro,-z,now -fPIE -pie -g -D_GNU_SOURCE
RUN apt-get purge -y gcc gcc-multilib make && rm -rf /home/ctf/chall.c

USER ctf

CMD ["socat", "TCP-LISTEN:50005,reuseaddr,fork", "EXEC:./chall,stderr"]
