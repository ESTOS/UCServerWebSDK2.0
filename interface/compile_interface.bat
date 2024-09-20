@echo off
SET ESNACC=esnacc-compiler\output\bin\esnacc.exe
SET ASN1DIR=asn1

IF NOT EXIST %ESNACC% (
	pushd esnacc-compiler
	build.bat
	IF NOT %ERRORLEVEL% == 0 (
		echo Failed to build esnacc compiler
		pause
		exit 1
	)
	popd
)

echo Building browser client stubs...
SET OUTDIR=..\browser-client\src\stub
IF EXIST %OUTDIR% RD /S /Q %OUTDIR%
MKDIR %OUTDIR%
echo %ESNACC% -JT -j -RTS_CLIENT_BROWSER -comments -ValidationLevel 0 -o %OUTDIR% %ASN1DIR%\*.asn1
%ESNACC% -JT -j -RTS_CLIENT_BROWSER -comments -ValidationLevel 0 -o %OUTDIR% %ASN1DIR%\*.asn1
echo.

IF NOT %ERRORLEVEL% == 0 (
	echo Build has failed, check console...>&2
	pause
	exit 1
)

echo Building node client stubs...
SET OUTDIR=..\node-client\src\stub
IF EXIST %OUTDIR% RD /S /Q %OUTDIR%
MKDIR %OUTDIR%
echo %ESNACC% -JT -j -RTS_CLIENT_NODE -comments -ValidationLevel 0 -o %OUTDIR% %ASN1DIR%\*.asn1
%ESNACC% -JT -j -RTS_CLIENT_NODE -comments -ValidationLevel 0 -o %OUTDIR% %ASN1DIR%\*.asn1
echo.

IF NOT %ERRORLEVEL% == 0 (
	echo Build has failed, check console...>&2
	pause
	exit 1
)

echo Building openapi files...
SET OUTDIR=..\openAPI\example\
DEL %OUTDIR%*.json 2>NUL
echo %ESNACC% -JO -j -comments -ValidationLevel 0 -o %OUTDIR% %ASN1DIR%\*.asn1
%ESNACC% -JO -j -comments -ValidationLevel 0 -o %OUTDIR% %ASN1DIR%\*.asn1
echo.

IF NOT %ERRORLEVEL% == 0 (
	echo Build has failed, check console...>&2
	pause
	exit 1
)

timeout /t 5

