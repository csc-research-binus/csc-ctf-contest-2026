FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y --no-install-recommends socat && \
    rm -rf /var/lib/apt/lists/*

RUN useradd --create-home --home-dir /home/ctf --shell /bin/bash ctf

WORKDIR /home/ctf

COPY my_kisah_simulator flag.txt ./

RUN chown root:ctf /home/ctf/my_kisah_simulator /home/ctf/flag.txt && \
    chmod 755 /home/ctf && \
    chmod 750 /home/ctf/my_kisah_simulator && \
    chmod 440 /home/ctf/flag.txt

USER ctf

EXPOSE 50007

CMD ["socat", "TCP-LISTEN:50007,reuseaddr,fork", "EXEC:/home/ctf/my_kisah_simulator,pty,stderr,setsid,sigint,rawer,echo=0"]
