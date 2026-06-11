import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';

// Obtenemos el ancho de la pantalla del dispositivo
const screenWidth = Dimensions.get('window').width;

export default function App() {
  // 1. La "memoria" de nuestra app
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorking, setIsWorking] = useState(true); // NUEVO: ¿Estamos en ciclo de trabajo?

  // 2. El motor del reloj
  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // NUEVO: Lógica cuando el reloj llega a cero
      if (isWorking) {
        // Terminó el trabajo de 25 min -> Toca descanso de 5 min
        setIsWorking(false);
        setTimeLeft(5 * 60);
      } else {
        // Terminó el descanso de 5 min -> Vuelta al trabajo
        setIsWorking(true);
        setTimeLeft(25 * 60);
        setIsRunning(false); // Pausamos para que tú decidas cuándo arrancar de nuevo
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isWorking]);

  // 3. Funciones de los botones
  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setIsWorking(true);
    setTimeLeft(25 * 60);
  };

  // 4. Matemáticas para mostrar el tiempo
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (

    // Cambiamos ligeramente el fondo si es descanso para dar feedback visual
    <View style={[styles.container, !isWorking && styles.containerBreak]}>

      {/* Encabezado */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Modo Enfoque</Text>
      </View>

      {/* Sección del Cronómetro Pomodoro */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime()}</Text>
        <Text style={styles.statusText}>
          {/* Mensajes dinámicos según el ciclo y estado */}
          {isRunning
            ? (isWorking ? 'Concentración al máximo...' : '¡Toma un respiro!')
            : (isWorking ? 'Listo para trabajar' : 'Descanso en pausa')}
        </Text>
      </View>

      {/* Botones de Control */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={isRunning ? styles.buttonPause : (isWorking ? styles.buttonPrimary : styles.buttonBreak)}
          onPress={toggleTimer}
        >
          <Text style={styles.buttonText}>{isRunning ? 'Pausar' : 'Iniciar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSecondary} onPress={resetTimer}>
          <Text style={styles.buttonTextSecondary}>Reiniciar</Text>
        </TouchableOpacity>
      </View>

      {/* Sección del Calendario */}
      <View style={styles.swipeArea}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false} // Oculta la barrita de desplazamiento
        >

          {/* Página 1: Calendario */}
          <View style={[styles.page, { width: screenWidth }]}>
            <View style={styles.card}>
              <Calendar
                onDayPress={day => console.log('Día:', day)}
                theme={{
                  todayTextColor: '#E53935',
                  arrowColor: '#E53935',
                }}
                hideExtraDays={true}
              />
            </View>
          </View>

          {/* Página 2: Reproductor de Música */}
          <View style={[styles.page, { width: screenWidth }]}>
            <View style={styles.card}>
              <Text style={styles.musicTitle}>🎵 Reproductor</Text>
              <Text style={styles.musicSubtitle}>Lofi Hip Hop Radio</Text>

              <View style={styles.musicControls}>
                <TouchableOpacity style={styles.musicBtn}><Text>⏮️</Text></TouchableOpacity>
                <TouchableOpacity style={styles.musicBtnPlay}><Text style={{ color: '#FFF' }}>▶️</Text></TouchableOpacity>
                <TouchableOpacity style={styles.musicBtn}><Text>⏭️</Text></TouchableOpacity>
              </View>
            </View>
          </View>

        </ScrollView>
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
  containerWorking: {
    backgroundColor: '#040505', // o
  },
  containerBreak: {
    backgroundColor: '#E8F5E9', // Un tono verde muy suave para indicar descanso
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
    color: '#333',
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
  buttonBreak: {
    backgroundColor: '#4CAF50', // Verde para iniciar descanso
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonPause: {
    backgroundColor: '#F57C00', // Naranja para pausa
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
  },// Estilos de la nueva zona deslizable
  swipeArea: {
    flex: 1, // Toma el resto del espacio disponible en la pantalla
    width: '100%',
  },
  page: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20, // Margen lateral para que las tarjetas no peguen en la orilla
  },
  card: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  // Estilos temporales del reproductor
  musicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  musicSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  musicControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  musicBtn: {
    padding: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
  },
  musicBtnPlay: {
    padding: 20,
    backgroundColor: '#333',
    borderRadius: 30,
  }
});