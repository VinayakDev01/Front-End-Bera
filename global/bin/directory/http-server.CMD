@SETLOCAL
@IF NOT DEFINED NODE_PATH (
  @SET "NODE_PATH=C:\Users\Admin\frontend-berachain\global\bin\directory\global\5\.pnpm\http-server@14.1.1\node_modules\http-server\bin\node_modules;C:\Users\Admin\frontend-berachain\global\bin\directory\global\5\.pnpm\http-server@14.1.1\node_modules\http-server\node_modules;C:\Users\Admin\frontend-berachain\global\bin\directory\global\5\.pnpm\http-server@14.1.1\node_modules;C:\Users\Admin\frontend-berachain\global\bin\directory\global\5\.pnpm\node_modules"
) ELSE (
  @SET "NODE_PATH=C:\Users\Admin\frontend-berachain\global\bin\directory\global\5\.pnpm\http-server@14.1.1\node_modules\http-server\bin\node_modules;C:\Users\Admin\frontend-berachain\global\bin\directory\global\5\.pnpm\http-server@14.1.1\node_modules\http-server\node_modules;C:\Users\Admin\frontend-berachain\global\bin\directory\global\5\.pnpm\http-server@14.1.1\node_modules;C:\Users\Admin\frontend-berachain\global\bin\directory\global\5\.pnpm\node_modules;%NODE_PATH%"
)
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\global\5\node_modules\http-server\bin\http-server" %*
) ELSE (
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\global\5\node_modules\http-server\bin\http-server" %*
)
