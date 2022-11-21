# Local NGINX
Uses certificates in ./local-ssl

## Add local.huntd.tech to /etc/hosts

- open `/etc/hosts` for editing
    ```bash
    sudo vi /etc/hosts
    ```
- add `local.huntd.tech` near `127.0.0.1`.
    ```nashorn js
    127.0.0.1       localhost
    127.0.0.1       localunixsocket.local
    + 127.0.0.1     local.huntd.tech
    ```

## Add certificate to trusted
- [Download certificate](https://medium.com/@menakajain/export-download-ssl-certificate-from-server-site-url-bcfc41ea46a2)
- Add certificate to trusted
    - [MacOS](https://tosbourn.com/getting-os-x-to-trust-self-signed-ssl-certificates/)
    - [Windows](https://community.spiceworks.com/how_to/1839-installing-self-signed-ca-certificate-in-windows)
