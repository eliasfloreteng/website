#!/bin/bash
trap ctrl_c INT

function ctrl_c() {
        echo "** Starting production server after dev"
        sudo systemctl start website &
        exit 0
}

sudo systemctl stop website && yarn dev
