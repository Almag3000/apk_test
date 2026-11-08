# WiFi Scanner
Android 10+ Wi-Fi scanner with manually selected network and password (12345678, 11111111, 88888888). Use only on networks you own or are authorized to test.

Build with Gradle 8.11.1 and JDK 17: `gradle assembleDebug` from this directory. GitHub Actions workflow is at repository root.
Android may require location permission, enabled location services, and user confirmation for each connection request. A failed connection does not prove the password was wrong.
