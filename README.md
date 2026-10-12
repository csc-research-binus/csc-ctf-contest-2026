# CSC CTF Contest 2026

Challenge repository and deployment automation for CSC CTF 2026.

## Category Structure

Organize challenges under their respective category directories:
- `Binary Exploitation/`
- `Cryptography/`
- `Forensic/`
- `Miscellaneous/`
- `Reverse Engineering/`
- `Web Exploitation/`
- `warmup/` (introductory challenges)

## Challenge Authoring Guidelines

1. Create a dedicated directory under the target category, e.g., `Web Exploitation/sample-chall/`.
2. Each challenge directory must contain a valid `challenge.yml` conforming to the `ctfcli` specification (refer to `_template/challenge.yml.example`).
3. Place distribution attachments (zip archives, pcaps, binaries, source code) in the challenge folder (e.g., `dist/`) and declare them under the `files:` section in `challenge.yml`.
4. For service-based challenges (Web, Pwn), include a `docker-compose.yml` in the challenge root directory.
5. Standard flag format: `CSC{...}`.
6. Ensure host port bindings under `ports: "HOST_PORT:CONTAINER_PORT"` in `docker-compose.yml` do not collide with other challenges.

### Containerized Challenge Layout

```text
Web Exploitation/sample-chall/
├── challenge.yml
├── docker-compose.yml
├── Dockerfile
└── src/
    ├── app.py
    └── flag.txt
```

### Static Challenge Layout

```text
Forensic/sample-forensic/
├── challenge.yml
└── dist/
    └── capture.pcapng
```

## CI/CD Deployment Pipeline

Challenge deployment is automated via GitHub Actions:

1. **Gatekeeper (`gatekeeper.yml`)**
   - Validates pull requests targeting `main`.
   - Requires review approval from authorized admins (`darflashxd`, `eludee`, `wavess`) before merging.

2. **CTFd Synchronization & VPS Deployment (`deploy.yml`)**
   - Triggers on push to `main` or manual `workflow_dispatch`.
   - **CTFd Sync**: Uses `ctfcli` to synchronize challenge metadata (`challenge.yml`), flags, tags, and upload file attachments directly to the CTFd instance.
   - **VPS Deploy**: Authenticates to the server via SSH, pulls the latest changes (`git fetch && git reset --hard origin/main`), rebuilds and restarts modified containers (`docker compose up -d --build --force-recreate`), and prunes unused images (`docker image prune -f`).

### Required GitHub Secrets

Configure the following secrets in repository settings:
- `CTFD_URL`: Base URL of the CTFd instance
- `CTFD_TOKEN`: CTFd admin API access token
- `SSH_HOST`: Target server IP address or hostname
- `SSH_USER`: SSH deployment user
- `SSH_PORT`: SSH port
- `SSH_PRIVATE_KEY`: Private SSH key for server authentication
