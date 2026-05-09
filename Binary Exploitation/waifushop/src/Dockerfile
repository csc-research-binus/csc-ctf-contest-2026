FROM ubuntu:latest

RUN apt-get update && apt-get install -y socat gcc gcc-multilib && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN useradd -U -m -s /bin/bash ctf

COPY ./chall.c /home/ctf/chall.c
COPY ./flag.txt /home/ctf/flag.txt

RUN chown -R root:ctf /home/ctf && chmod -R 550 /home/ctf
RUN chmod 440 /home/ctf/flag.txt

WORKDIR /home/ctf/
RUN gcc chall.c -o chall -fno-stack-protector -no-pie
RUN apt-get purge -y gcc gcc-multilib make && rm -rf /home/ctf/chall.c

USER ctf

CMD ["socat", "TCP-LISTEN:50006,reuseaddr,fork", "EXEC:./chall,stderr"]
