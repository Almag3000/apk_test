package com.example.wifiscanner

import android.Manifest
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.PackageManager
import android.net.ConnectivityManager
import android.net.Network
import android.net.NetworkCapabilities
import android.net.NetworkRequest
import android.net.wifi.ScanResult
import android.net.wifi.WifiManager
import android.net.wifi.WifiNetworkSpecifier
import android.os.Build
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

class MainActivity : ComponentActivity() {
    private lateinit var wifi: WifiManager
    private lateinit var cm: ConnectivityManager
    private var callback: ConnectivityManager.NetworkCallback? = null
    private val networks = mutableStateListOf<ScanResult>()
    private var status by mutableStateOf("Включите Wi-Fi и геолокацию, затем нажмите «Сканировать».")
    private val receiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) { refresh() }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        wifi = applicationContext.getSystemService(Context.WIFI_SERVICE) as WifiManager
        cm = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        registerReceiver(receiver, IntentFilter(WifiManager.SCAN_RESULTS_AVAILABLE_ACTION))
        setContent {
            var selected by remember { mutableStateOf<ScanResult?>(null) }
            var password by remember { mutableStateOf("12345678") }
            val permissionLauncher = rememberLauncherForActivityResult(ActivityResultContracts.RequestMultiplePermissions()) {
                if (hasPermissions()) scan() else status = "Предоставьте разрешение на геолокацию и Wi-Fi."
            }
            MaterialTheme {
                Scaffold(topBar = { Surface(tonalElevation = 3.dp) {
                    Text("WiFi Scanner", Modifier.fillMaxWidth().padding(20.dp), style = MaterialTheme.typography.titleLarge)
                } }) { padding ->
                    Column(Modifier.fillMaxSize().padding(padding).padding(16.dp)) {
                        Text(status)
                        Spacer(Modifier.height(12.dp))
                        Button(onClick = { if (hasPermissions()) scan() else permissionLauncher.launch(permissions()) }) {
                            Text("Сканировать сети")
                        }
                        Spacer(Modifier.height(12.dp))
                        LazyColumn(Modifier.weight(1f)) {
                            items(networks, key = { it.BSSID ?: it.SSID }) { item ->
                                Column(Modifier.fillMaxWidth().clickable { selected = item }.padding(vertical = 12.dp)) {
                                    Text(item.SSID.ifBlank { "Скрытая сеть" }, style = MaterialTheme.typography.titleMedium)
                                    Text("${item.level} dBm · ${item.capabilities}", style = MaterialTheme.typography.bodySmall)
                                    HorizontalDivider()
                                }
                            }
                        }
                        selected?.let { item ->
                            Text("Выбрана: ${item.SSID}", style = MaterialTheme.typography.titleMedium)
                            Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                                listOf("12345678", "11111111", "88888888").forEach { p ->
                                    FilterChip(selected = password == p, onClick = { password = p }, label = { Text(p) })
                                }
                            }
                            Button(onClick = { connect(item, password) }) { Text("Проверить подключение") }
                            Text("Только для сетей с разрешением владельца.", style = MaterialTheme.typography.bodySmall)
                        }
                    }
                }
            }
        }
    }

    private fun permissions(): Array<String> =
        if (Build.VERSION.SDK_INT >= 33)
            arrayOf(Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.NEARBY_WIFI_DEVICES)
        else arrayOf(Manifest.permission.ACCESS_FINE_LOCATION)

    private fun hasPermissions() = permissions().all { checkSelfPermission(it) == PackageManager.PERMISSION_GRANTED }

    @Suppress("DEPRECATION")
    private fun scan() {
        if (!wifi.isWifiEnabled) { status = "Включите Wi-Fi."; return }
        val started = wifi.startScan()
        status = if (started) "Сканирование…" else "Новое сканирование ограничено Android."
        refresh()
    }

    @Suppress("DEPRECATION")
    private fun refresh() {
        if (!hasPermissions()) return
        try {
            val found = wifi.scanResults.filter { it.SSID.isNotBlank() }
                .distinctBy { it.BSSID }.sortedByDescending { it.level }
            networks.clear()
            networks.addAll(found)
            status = "Найдено точек доступа: ${found.size}"
        } catch (e: SecurityException) { status = "Нет разрешения на сканирование." }
    }

    private fun connect(item: ScanResult, password: String) {
        val caps = item.capabilities.uppercase()
        if (caps.contains("WEP") || caps.contains("EAP") || !caps.contains("PSK")) {
            status = "Поддерживаются только WPA2-Personal сети."
            return
        }
        callback?.let { try { cm.unregisterNetworkCallback(it) } catch (_: Exception) {} }
        val specifier = WifiNetworkSpecifier.Builder()
            .setSsid(item.SSID).setWpa2Passphrase(password).build()
        val request = NetworkRequest.Builder()
            .addTransportType(NetworkCapabilities.TRANSPORT_WIFI)
            .removeCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
            .setNetworkSpecifier(specifier).build()
        status = "Подтвердите запрос Android для ${item.SSID}."
        val cb = object : ConnectivityManager.NetworkCallback() {
            override fun onAvailable(network: Network) {
                runOnUiThread { status = "Подключено к ${item.SSID} (локальная сеть)." }
            }
            override fun onUnavailable() {
                runOnUiThread { status = "Подключение не удалось. Причина неизвестна." }
            }
            override fun onLost(network: Network) {
                runOnUiThread { status = "Соединение потеряно." }
            }
        }
        callback = cb
        try { cm.requestNetwork(request, cb, 30_000) }
        catch (e: Exception) { status = "Ошибка подключения: ${e.message}" }
    }

    override fun onDestroy() {
        callback?.let { try { cm.unregisterNetworkCallback(it) } catch (_: Exception) {} }
        unregisterReceiver(receiver)
        super.onDestroy()
    }
}
