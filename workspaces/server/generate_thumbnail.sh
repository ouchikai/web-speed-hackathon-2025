#!/bin/bash
set -euxo pipefail  # エラー時にスクリプトを停止し、詳細なデバッグ情報を出力

cd "$(dirname "$0")"  # スクリプトのディレクトリに移動

BASE_DIR="streams"  # 入力ディレクトリ
THUMBNAIL_DIR="streams-thumbnail"  # 出力ディレクトリ

rm -rf "$THUMBNAIL_DIR"  # 古いサムネイルディレクトリを削除
mkdir -p "$THUMBNAIL_DIR"  # 新しいサムネイルディレクトリを作成

for dir in "$BASE_DIR"/*; do  # streamsディレクトリ内の各サブディレクトリを処理
    dir_name=$(basename "$dir")  # サブディレクトリ名を取得
    echo "Processing directory: $dir_name"
    
    ts_files=$(find "$dir" -name "*.ts" | sort)  # .tsファイルを検索してソート
    if [ -z "$ts_files" ]; then  # .tsファイルが見つからない場合
        echo "No .ts files found in $dir_name, skipping..."
        continue
    fi
    
    concat_list=""
    for ts_file in $ts_files; do  # 各.tsファイルを結合リストに追加
        concat_list="${concat_list}${ts_file}|"
    done
    concat_list=${concat_list%|}  # 末尾のパイプ文字を削除
    
    # 1秒ごとのサムネイルを生成（160x90、タイル状）
    echo "Generating thumbnails..."
    ffmpeg -i "concat:$concat_list" -vf "fps=1,scale=160:90,tile=250x1" -frames:v 1 "$THUMBNAIL_DIR/$dir_name.jpg"
    # concat: すべての.tsファイルを結合
    # fps=1: 1秒ごとにフレームを抽出
    # scale=160:90: サムネイルのサイズを指定
    # tile=250x1: 横に250フレーム並べるタイル形式
    # frames:v 1: 出力フレーム数を1に制限
    
    echo "Thumbnails generated for $dir_name"
done

echo "All thumbnails generated successfully!"

ls -lh "$THUMBNAIL_DIR"  # サムネイルディレクトリの内容をリスト表示