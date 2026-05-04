FROM ubuntu:22.04
RUN apt-get update && apt-get install -y \
    gcc \
    socat \
    && rm -rf /var/lib/apt/lists/*
RUN useradd -m cscuser
WORKDIR /home/cscuser
COPY chall.c .
RUN gcc -fno-stack-protector -no-pie -o chall chall.c
RUN chown root:root /home/cscuser/chall && \
    chmod 755 /home/cscuser/chall
USER cscuser
EXPOSE 50004
CMD socat TCP-LISTEN:50004,reuseaddr,fork EXEC:./chall,stderr
