#!/usr/bin/env python3
from http.server import HTTPServer, SimpleHTTPRequestHandler
import ssl

def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler, port=443):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    
    # SSL 配置 - 使用较新的 Python 3.6+ 语法
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain(certfile='server.crt', keyfile='server.key')
    
    httpd.socket = context.wrap_socket(httpd.socket, server_side=True)
    
    print(f"HTTPS 服务器正在运行，端口: {port}")
    print(f"访问地址: https://localhost:{port}")
    print(f"或通过: https://服务器IP:{port}")
    print("按 Ctrl+C 停止服务器")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n服务器已停止")

if __name__ == '__main__':
    run(port=8443)