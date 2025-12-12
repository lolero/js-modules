#!/bin/bash

# Trap Ctrl-C and gracefully shutdown the emulator
trap 'echo "Stopping emulator..."; kill -TERM $EMULATOR_PID 2>/dev/null; wait $EMULATOR_PID 2>/dev/null; exit 0' INT TERM

# Start the emulator in the background and save its PID
~/Android/Sdk/emulator/emulator -avd Medium_Phone -wipe-data -no-snapshot &
EMULATOR_PID=$!

echo "Starting emulator (PID: $EMULATOR_PID)..."

# Wait for device to be detected
~/Android/Sdk/platform-tools/adb wait-for-device
echo "Device detected, waiting for boot to complete..."

# Wait until boot is completed
until ~/Android/Sdk/platform-tools/adb shell getprop sys.boot_completed 2>/dev/null | grep -q 1; do
    sleep 2
done
echo "Boot completed, waiting for storage to be ready..."

# Wait until storage is writable
until ~/Android/Sdk/platform-tools/adb shell 'test -w /sdcard/Download && echo ready' 2>/dev/null | grep -q ready; do
    sleep 2
done
echo "Storage ready, pushing certificate..."

# Push the certificate
~/Android/Sdk/platform-tools/adb push ../apps-travel-log-config-docker/docker-compose/travel-log-dev/ssl/nginx-selfsigned.crt /sdcard/Download/nginx-selfsigned.crt

echo "Certificate pushed successfully!"
echo "Opening Security settings..."

# Open Security & privacy settings
~/Android/Sdk/platform-tools/adb shell am start -a android.settings.SECURITY_SETTINGS

echo "Security & privacy screen opened. Navigate to 'More security & privacy' > 'Encryption & credentials' > 'Install a certificate' > 'CA certificate' > select nginx-selfsigned.crt"
echo "Emulator is running (PID: $EMULATOR_PID). Press Ctrl-C to stop."

# Wait for the emulator process to complete
wait $EMULATOR_PID
