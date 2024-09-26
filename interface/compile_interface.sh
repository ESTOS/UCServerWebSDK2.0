#!/bin/bash

ESNACC="esnacc-compiler/output/bin/esnacc"
ASN1DIR="asn1"

if [ ! -f "$ESNACC" ]; then
  pushd esnacc-compiler
  source ./build.sh
  if [ $? -ne 0 ]; then
    echo "Failed to build esnacc compiler"
    exit 1
  fi
  popd
fi

echo "Building browser client stubs..."
OUTDIR="../browser-client/src/stub"
if [ -d "$OUTDIR" ]; then
  rm -rf "$OUTDIR"
fi
mkdir -p "$OUTDIR"
echo "$ESNACC -JT -j -RTS_CLIENT_BROWSER -comments -ValidationLevel 0 -o $OUTDIR $ASN1DIR/*.asn1"
$ESNACC -JT -j -RTS_CLIENT_BROWSER -comments -ValidationLevel 0 -o "$OUTDIR" "$ASN1DIR"/*.asn1

if [ $? -ne 0 ]; then
  echo "Build has failed, check console..." >&2
  exit 1
fi

echo "Building node client stubs..."
OUTDIR="../node-client/src/stub"
if [ -d "$OUTDIR" ]; then
  rm -rf "$OUTDIR"
fi
mkdir -p "$OUTDIR"
echo "$ESNACC -JT -j -RTS_CLIENT_NODE -comments -ValidationLevel 0 -o $OUTDIR $ASN1DIR/*.asn1"
$ESNACC -JT -j -RTS_CLIENT_NODE -comments -ValidationLevel 0 -o "$OUTDIR" "$ASN1DIR"/*.asn1

if [ $? -ne 0 ]; then
  echo "Build has failed, check console..." >&2
  exit 1
fi

echo "Building openapi files..."
OUTDIR="../openAPI/example/"
rm -f "$OUTDIR"*.json
echo "$ESNACC -JO -j -comments -ValidationLevel 0 -o $OUTDIR $ASN1DIR/*.asn1"
$ESNACC -JO -j -comments -ValidationLevel 0 -o "$OUTDIR" "$ASN1DIR"/*.asn1

if [ $? -ne 0 ]; then
  echo "Build has failed, check console..." >&2
  exit 1
fi
