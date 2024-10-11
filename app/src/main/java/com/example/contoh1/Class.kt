package com.example.contoh1

class Motor()

class Contact(val id: Int, var email: String)

fun main() {
    val contact = Contact(1,"mary@gmail.com")

// Prints the value of the property: email
    println(contact.email)
