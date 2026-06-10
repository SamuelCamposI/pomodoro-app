import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      
      {/* Encabezado */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Modo Enfoque</Text>
      </View>

      {/* Sección del Cronómetro Pomodoro */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>25:00</Text>
        <Text style={styles.statusText}>Listo para trabajar</Text>
      </View>

      {/* Botones de Control */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.buttonPrimary}>
          <Text style={styles.buttonText}>Iniciar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary}>
          <Text style={styles.buttonTextSecondary}>Reiniciar</Text>
        </TouchableOpacity>
      </View>

      {/* Sección del Calendario (Placeholder por ahora) */}
      <View style={styles.calendarContainer}>
        <Text style={styles.calendarText}>📅 Aquí integraremos el calendario</Text>
      </View>

    </View>
  );
}

// Aquí definimos los estilos (similar a CSS pero en un objeto de JavaScript)
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda la pantalla
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'space-evenly', // Distribuye los elementos uniformemente
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    height: 250,
    borderRadius: 125, // Lo hace un círculo
    backgroundColor: '#FFFFFF',
    elevation: 5, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  timerText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#E53935', // Rojo estilo Pomodoro
  },
  statusText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  controlsContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  buttonPrimary: {
    backgroundColor: '#E53935',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonSecondary: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextSecondary: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  calendarContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 15,
    alignItems: 'center',
  },
  calendarText: {
    color: '#888',
  }
});