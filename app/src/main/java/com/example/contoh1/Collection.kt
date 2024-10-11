package com.example.contoh1

fun ContohList() {
println("=== List ===")
// List Read-Only
val readOnlyAbjad = listOf("A", "B", "C")
println(readOnlyAbjad)

// List Mutable
val shape: MutableList<String> = mutableListOf("Circle", "Square", "Triangle")
println(shape)

// Menambahkan data ke dalam List Mutable
shape.add("Circle")
println(shape)

// Menghapus data dari List Mutable
shape.remove("Triangle")
println(shape)

// Mengubah data di dalam List Mutable
    shape[0] = "Oval"
    println()


// List Read-Only
    val shapesLocked: List<String> = shape
    println(shapesLocked)
}

fun ContohSet() {
    println()
    println("===== Set =====")

// Set Read-Only
    val readOnlyAbjad = setOf("A", "B", "C")
    println(readOnlyAbjad)

// Set Mutable
    val shape: MutableSet<String> = mutableSetOf("Circle", "Square", "Triangle")
    println(shape)

// Menambahkan data ke dalam Set Mutable
    shape.add("Rectangle")
    println(shape)

// Menghapus data dari Set Mutable
    shape.remove("Circle")
    println(shape)

// Set Read-Only
    val shapesLocked: Set<String> = shape
    println(shapesLocked)
}

fun ContohMap() {
    println()
    println("===== Map =====")

// Map Read-Only
    val readOnlyShape: Map<String, Int> = mapOf("Circle" to 1, "Square" to 2, "Triangle" to 3)
    println(readOnlyShape)

// Map Mutable
    val shape: MutableMap<String, Int> = mutableMapOf("Circle" to 1, "Square" to 2, "Triangle" to 3)
    println(shape)

// Menambahkan data ke dalam Map Mutable
    shape["Rectangle"] = 4
    println(shape)

// Menghapus data dari Map Mutable
    shape.remove("Circle")
    println(shape)
}








