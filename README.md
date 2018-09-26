 # INSTALL
## 配置nginx
## Create virtual host

Rederence `docs/nginx.conf`. Here is the virtual host configure for me:

```
server {
   listen       80;
   server_name  test.shegurz.com;

   access_log /www/testlh/lhauction2/logs/dev.curio.com.access.log;
   error_log  /www/testlh/lhauction2/logs/dev.curio.com.error.log;

   root /www/testlh/lhauction2/website;
   index  index.php index.html index.htm;
   client_max_body_size 128m;

   large_client_header_buffers 4 16k;
   client_body_buffer_size 128k;
   fastcgi_connect_timeout 1200s;
   fastcgi_read_timeout 1200s;
   fastcgi_send_timeout 1200s;
   fastcgi_buffer_size 64k;
   fastcgi_buffers   4 64k;
   fastcgi_busy_buffers_size 128k;
   fastcgi_temp_file_write_size 256k;

   location / {
       if (!-e $request_filename) {
           rewrite ^/(.*)$ /index.php?$1 last;
           break;
       }
   }

   location /adm/ {
       if (!-e $request_filename) {
           rewrite ^/(.*)$ /adm/index.php?$1 last;
           break;
       }
   }

   location ~ \.php$ {
       root           /www/testlh/lhauction2/website;
       fastcgi_pass   127.0.0.1:9000;
       fastcgi_index  index.php;
       fastcgi_param  SCRIPT_FILENAME /www/testlh/lhauction2/website$fastcgi_script_name;
       include        fastcgi_params;
   }
}

```
## 开启php－fpm
- php-fpm -D

## 配置mysql
- source docs/db/init2.sql

## 配置服务器ip
- website/www/config/config.php
- $config[‘base_url’] = ‘your domain’
- website/adm/config/config.php
- $config[‘base_url’] = ‘your domain’

## 配置api及请求域名／ip路径
- website/adm/views/static/js/common.js
- website/www/views/static/js/common.js
- 修改 apiServer／resServer域名／ip
