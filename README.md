# CSC CTF Contest 2026

Repository manajemen dan deployment challenge CSC CTF 2026.

## Struktur Kategori

Masukkan tantangan ke direktori kategori yang sesuai:
- `Binary Exploitation/`
- `Cryptography/`
- `Forensic/`
- `Miscellaneous/`
- `Reverse Engineering/`
- `Web Exploitation/`
- `warmup/` (sub-kategori pemanasan)

## Panduan Penambahan Challenge

1. Buat folder baru di bawah kategori terkait, contoh: `Web Exploitation/sample-chall/`.
2. Setiap folder soal wajib memiliki `challenge.yml` valid (ikuti format `_template/challenge.yml.example` atau spesifikasi `ctfcli`).
3. File attachment (zip, pcap, binary, source code) diletakkan di dalam folder soal (misal `dist/`) dan didaftarkan pada atribut `files:` di `challenge.yml`.
4. Untuk soal dinamis / berbasis server, sediakan `docker-compose.yml` di root folder soal tersebut.
5. Format flag standar: `CSC{...}`.
6. Pastikan port host pada `ports: "HOST_PORT:CONTAINER_PORT"` di `docker-compose.yml` tidak konflik dengan soal lain.

### Contoh Soal dengan Container

```text
Web Exploitation/sample-chall/
├── challenge.yml
├── docker-compose.yml
├── Dockerfile
└── src/
    ├── app.py
    └── flag.txt
```

### Contoh Soal Statis

```text
Forensic/sample-forensic/
├── challenge.yml
└── dist/
    └── capture.pcapng
```

## Alur CI/CD

Deployment dikelola secara otomatis menggunakan GitHub Actions:

1. **Gatekeeper (`gatekeeper.yml`)**
   - Menjaga integritas branch `main`.
   - Mengharuskan review approval dari akun admin terdaftar (`darflashxd`, `eludee`, `wavess`) sebelum PR dapat digabungkan.

2. **Sync CTFd & Deploy VPS (`deploy.yml`)**
   - Berjalan pada event `push` ke branch `main` atau dipicu manual lewat `workflow_dispatch`.
   - **Sync CTFd**: Menggunakan `ctfcli` untuk sinkronisasi metadata soal (`challenge.yml`), flag, tags, dan upload file attachment.
   - **Deploy VPS**: Akses SSH ke VPS, update repository (`git fetch && git reset --hard origin/main`), rebuild container terkait (`docker compose up -d --build --force-recreate`), dan pembersihan image lama (`docker image prune -f`).

### Konfigurasi GitHub Secrets

Pastikan secret berikut sudah terdaftar di repository settings:
- `CTFD_URL`: Endpoint CTFd instans
- `CTFD_TOKEN`: Token API admin CTFd
- `SSH_HOST`: IP atau hostname server Docker
- `SSH_USER`: Username SSH VPS
- `SSH_PORT`: Port SSH server
- `SSH_PRIVATE_KEY`: Kunci privat SSH untuk autentikasi deployment
