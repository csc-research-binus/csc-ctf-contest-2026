# CSC CTF Contest 2026 

Repositori ini digunakan untuk manajemen dan deployment soal-soal (challenges) CSC CTF 2026.
Sistem deployment sudah diotomatisasi menggunakan GitHub Actions untuk sinkronisasi soal ke CTFd dan menjalankan container soal (Web, Pwn, dll) di VPS.

##  Struktur Direktori Kategori

Silakan masukkan soal buatan kalian ke dalam direktori kategori yang sesuai:
- `web/` - Web Exploitation
- `binex/` - Binary Exploitation (Pwn)
- `crypto/` - Cryptography
- `forensics/` - Digital Forensics
- `reverse/` - Reverse Engineering
- `misc/` - Miscellaneous

##  Cara Membuat Soal Baru

1. Buat folder baru di dalam kategori yang sesuai, misal: `web/my-web-chall/`.
2. Di dalam folder tersebut, **wajib** ada file `challenge.yml`. Kalian bisa meng-copy file `challenge.yml` yang ada di luar (root) repo ini sebagai template.
3. Untuk soal yang memiliki file *attachment* (contoh: `.zip`, `.pcap`, file binary), masukkan file tersebut ke dalam folder (misal `web/my-web-chall/dist/source.zip`) dan daftarkan di `challenge.yml` pada bagian `files:`.
4. Untuk soal yang membutuhkan server/container (contoh: Web, Binex/Pwn), buat file `docker-compose.yml` di dalam folder soal kalian (misal `web/my-web-chall/docker-compose.yml`).

### Contoh Struktur Soal dengan Docker (Web/Binex):
```text
web/my-web-chall/
├── challenge.yml
├── docker-compose.yml
├── Dockerfile
└── src/
    ├── index.php
    └── flag.txt
```

### Contoh Struktur Soal Statis (Forensics/Reverse/Crypto):
```text
forensics/my-forensics-chall/
├── challenge.yml
└── dist/
    └── evidence.pcap
```

##  Deployment Otomatis (CI/CD)

Repositori ini menggunakan **2 tahap deployment otomatis** setiap kali ada yang melakukan *push* ke branch `main`:
1. **Sync CTFd:** Membaca semua file `challenge.yml` lalu mengunggah deskripsi, file attachment, serta flag langsung ke platform CTFd menggunakan `ctfcli`.
2. **Deploy VPS:** GitHub Actions akan login ke VPS via SSH, melakukan `git pull`, lalu mencari seluruh file `docker-compose.yml` dan menjalankan `docker compose up -d --build` secara terisolasi untuk tiap-tiap soal.

###  Secret yang Dibutuhkan di GitHub
Bagi admin repositori, pastikan GitHub Secrets berikut sudah dikonfigurasi di pengaturan repositori (Settings > Secrets and variables > Actions):
- `CTFD_URL` : URL CTFd (contoh: `https://ctf.domain.com`)
- `CTFD_TOKEN` : Token API dari Admin CTFd (Generate dari Settings CTFd)
- `SSH_HOST` : IP Address VPS untuk menjalankan Docker
- `SSH_USER` : Username VPS (contoh: `root`)
- `SSH_PRIVATE_KEY` : Private Key SSH untuk login ke VPS

##  Aturan Tambahan untuk Probsetter
- Pastikan **Port Host** yang digunakan di `docker-compose.yml` pada bagian `ports: "HOST_PORT:CONTAINER_PORT"` **tidak bentrok** antar soal. Koordinasikan port yang kalian pakai dengan admin atau probsetter lainnya.
- Format flag standar adalah: `CSC{...}`
