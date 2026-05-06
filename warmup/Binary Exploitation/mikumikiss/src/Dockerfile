FROM ubuntu:latest

RUN apt-get update && apt-get install -y socat gcc && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN useradd -U -m -s /bin/bash ctf


COPY ./chall.c /home/ctf/chall.c
COPY ./run.sh /home/ctf/run

RUN chown -R root:ctf /home/ctf && chmod -R 550 /home/ctf

WORKDIR /home/ctf/
RUN gcc -fno-stack-protector -no-pie chall.c -o chall
RUN apt-get purge -y gcc && rm -rf /home/ctf/chall.chall

CMD socat TCP-L:23432,fork EXEC:"/home/ctf/run",reuseaddr,stderr