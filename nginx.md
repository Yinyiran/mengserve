
    # 图片缩略图
    #location ~* /image_data/(.*)_(\d+)x(\d+)\.jpg$ {
    #    root /;
    #    set $s $1;
    #    set $w $2;
    #    set $h $3;
    #    image_filter resize $w $h;
    #    image_filter_buffer 10M;
    #    rewrite ^/image_data/(.*)$ /image_data/$s.jpg break;
    #}

location ~ (.+)\.(jpg|gif|png)@(\d+)w_(\d+)h_(\d+)Q_([rc])$ {
    # 限制referer，防盗链
    valid_referers test.vimer.club;
    if ($invalid_referer) {return 404;}

    set $w $3; #宽
    set $h $4; #高
    set $q $5; #图片质量
    set $type $6;
    set $image_path  $1.$2; #真实图片地址
    set $cache_path  $1_$3w_$4h_$5Q_$6.$2;  #临时文件地址
    if ($type = 'r') {
        set $type 'image-resize';
    }
    if ($type = 'c') {
        set $type 'image-crop';
    }
    set $image_uri  /$type$image_path?w=$w&h=$h&q=$q;
    if (-f $document_root$cache_path) {
        rewrite (.+)\.(jpg|gif|png)@(\d+)w_(\d+)h_(\d+)Q_([rc])$ $1_$3w_$4h_$5Q_$6.$2;
        break;
    }
    if (!-f $document_root$cache_path) {
        proxy_pass http://$server_name$image_uri;
        break;
    }
    proxy_store $document_root$cache_path;
    proxy_store_access user:rw group:rw all:r;
    proxy_set_header Host $host;
    expires  10d; # 设置图片过期时间10天
}
location ~ /image-resize(.+)\.(jpg|gif|png) {
    rewrite /image-resize(.+)\.(jpg|gif|png)$ $1.$2 break;
    image_filter resize $arg_w $arg_h;
    image_filter_jpeg_quality $arg_q;
    image_filter_buffer 5M;
    try_files $1.$2 /img/notfound.jpg;
}
location ~ /image-crop(.+)\.(jpg|gif|png) {
    rewrite /image-crop(.+)\.(jpg|gif|png)$ $1.$2 break;
    image_filter crop $arg_w $arg_h;
    image_filter_jpeg_quality $arg_q;
    image_filter_buffer 5M;
    try_files $1.$2 /img/notfound.jpg;
}