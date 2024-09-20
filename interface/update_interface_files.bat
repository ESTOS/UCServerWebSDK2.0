@echo off
SET ASN1DIR=X:\dev\procall\estos\common\libs\ENetConnection_Common\asn1files
SET ESNACC=esnacc-compiler\output\bin\esnacc.exe
SET OUTDIR=asn1

IF NOT EXIST %ASN1DIR% (
	echo This file is only intended to be used by estos employees to update
	echo the interface files of the UCServer WebSDK 2.0
	pause
	exit 1
)

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

IF EXIST %OUTDIR% RD /S /Q %OUTDIR%
MKDIR %OUTDIR%

echo %ESNACC% -nodeprecated -noprivate -filter -o %OUTDIR% %ASN1DIR%\*.asn1
%ESNACC% -nodeprecated -noprivate -filter -o %OUTDIR% %ASN1DIR%\*.asn1

IF NOT %ERRORLEVEL% == 0 (
	echo Failed to filter asn1 files.
	pause
	exit 1
)

timeout /t 5

