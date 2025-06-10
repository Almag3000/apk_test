package com.example.myapplication

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

enum class Operation { ADD, SUBTRACT, MULTIPLY, DIVIDE }

data class CalculatorState(
    val display: String = "0",
    val operand: Double? = null,
    val pendingOperation: Operation? = null,
    val clearOnNextDigit: Boolean = false
)

@Composable
fun CalculatorScreen() {
    var state by remember { mutableStateOf(CalculatorState()) }

    fun onDigit(digit: String) {
        val newDisplay = if (state.clearOnNextDigit || state.display == "0") digit else state.display + digit
        state = state.copy(display = newDisplay, clearOnNextDigit = false)
    }

    fun onDecimal() {
        if (state.clearOnNextDigit) {
            state = state.copy(display = "0.", clearOnNextDigit = false)
        } else if (!state.display.contains(".")) {
            state = state.copy(display = state.display + ".")
        }
    }

    fun onOperation(op: Operation) {
        val current = state.display.toDoubleOrNull() ?: 0.0
        val result = when (state.pendingOperation) {
            Operation.ADD -> (state.operand ?: 0.0) + current
            Operation.SUBTRACT -> (state.operand ?: 0.0) - current
            Operation.MULTIPLY -> (state.operand ?: 0.0) * current
            Operation.DIVIDE -> (state.operand ?: 0.0) / current
            null -> current
        }
        state = state.copy(
            display = result.toString().trimEnd('0').trimEnd('.'),
            operand = result,
            pendingOperation = op,
            clearOnNextDigit = true
        )
    }

    fun onEqual() {
        if (state.pendingOperation != null) {
            onOperation(state.pendingOperation!!)
            state = state.copy(pendingOperation = null)
        }
    }

    fun onClear() {
        state = CalculatorState()
    }

    fun onToggleSign() {
        val value = -(state.display.toDoubleOrNull() ?: 0.0)
        state = state.copy(display = value.toString().trimEnd('0').trimEnd('.'))
    }

    fun onPercent() {
        val value = (state.display.toDoubleOrNull() ?: 0.0) / 100
        state = state.copy(display = value.toString().trimEnd('0').trimEnd('.'))
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black)
            .padding(16.dp),
        verticalArrangement = Arrangement.Bottom
    ) {
        Text(
            text = state.display,
            color = Color.White,
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 32.dp),
            fontSize = 48.sp,
            fontWeight = FontWeight.Light,
            textAlign = androidx.compose.ui.text.style.TextAlign.End
        )
        val buttonModifier = Modifier
            .padding(4.dp)
            .size(80.dp)

        val lightGray = Color(0xFFd4d4d2)
        val darkGray = Color(0xFF505050)
        val orange = Color(0xFFff9500)

        fun calcButton(text: String, color: Color = darkGray, onClick: () -> Unit) {
            Button(
                onClick = onClick,
                colors = ButtonDefaults.buttonColors(containerColor = color),
                modifier = buttonModifier
            ) { Text(text = text, fontSize = 24.sp, color = Color.White) }
        }

        fun topButton(text: String, onClick: () -> Unit) {
            Button(
                onClick = onClick,
                colors = ButtonDefaults.buttonColors(containerColor = lightGray),
                modifier = buttonModifier
            ) { Text(text = text, fontSize = 24.sp, color = Color.Black) }
        }

        fun opButton(text: String, onClick: () -> Unit) {
            Button(
                onClick = onClick,
                colors = ButtonDefaults.buttonColors(containerColor = orange),
                modifier = buttonModifier
            ) { Text(text = text, fontSize = 24.sp, color = Color.White) }
        }

        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceEvenly) {
            topButton("AC") { onClear() }
            topButton("±") { onToggleSign() }
            topButton("%") { onPercent() }
            opButton("÷") { onOperation(Operation.DIVIDE) }
        }
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceEvenly) {
            calcButton("7") { onDigit("7") }
            calcButton("8") { onDigit("8") }
            calcButton("9") { onDigit("9") }
            opButton("×") { onOperation(Operation.MULTIPLY) }
        }
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceEvenly) {
            calcButton("4") { onDigit("4") }
            calcButton("5") { onDigit("5") }
            calcButton("6") { onDigit("6") }
            opButton("−") { onOperation(Operation.SUBTRACT) }
        }
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceEvenly) {
            calcButton("1") { onDigit("1") }
            calcButton("2") { onDigit("2") }
            calcButton("3") { onDigit("3") }
            opButton("+") { onOperation(Operation.ADD) }
        }
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceEvenly) {
            Button(
                onClick = { onDigit("0") },
                colors = ButtonDefaults.buttonColors(containerColor = darkGray),
                modifier = Modifier
                    .padding(4.dp)
                    .width(168.dp)
                    .height(80.dp)
            ) { Text(text = "0", fontSize = 24.sp, color = Color.White) }
            calcButton(".") { onDecimal() }
            opButton("=") { onEqual() }
        }
    }
}
