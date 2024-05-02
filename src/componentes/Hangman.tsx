import { useState , useEffect} from "react";
import '../css/Hangman.css';
// Interfaz que especifica las propiedades esperadas por el componente Hangman
interface HangmanProps {
    food: string[]; // Array de palabras para adivinar
    computers: string[]; // Array de palabras relacionadas con computadoras (no utilizado en este componente)
    mexicanFood: string[]; // Array de palabras relacionadas con comida mexicana (no utilizado en este componente)
}

// Componente Hangman
const Hangman = ({ food, computers, mexicanFood }: HangmanProps) => {
    // Estado para la palabra seleccionada
    const [selectedWord, setSelectedWord] = useState("");
    // Estado para las letras adivinadas
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    // Estado para el número de errores cometidos
    const [errorCount, setErrorCount] = useState(0);
    // Estado para controlar si el input está deshabilitado
    const [inputDisabled, setInputDisabled] = useState(false);
    // Estado para la categoría seleccionada
    const [selectedCategory, setSelectedCategory] = useState("");
    // Estado para la palabra secreta 
    const [SecretWord, SetSecretWord] = useState("");

    const [count, setCount] = useState(0)


    // Función para seleccionar una categoría aleatoria
    const selectRandomCategory = () => {
        const categories = ["food", "computers", "mexicanFood"];
        const randomIndex = Math.floor(Math.random() * categories.length);
        return categories[randomIndex];
    };

    // Calcula la palabra a mostrar en pantalla, sustituyendo las letras no adivinadas por guiones
    const displayWord = selectedWord.split('').map((letter, index) => {
        if (guessedLetters.includes(letter)) {
            return letter; // Si la letra ya fue adivinada, se muestra
        } else {
            return '_'; // Si la letra no ha sido adivinada, se muestra un guión
        }
    });

    // Función para manejar la conjetura del jugador
    const handleGuess = (letter: string) => {
        if (!guessedLetters.includes(letter)) {
            // Si la letra no ha sido adivinada aún
            setGuessedLetters([...guessedLetters, letter]); // Añade la letra a las letras adivinadas

            if (!selectedWord.includes(letter)) {
                // Si la letra no está en la palabra seleccionada
                setErrorCount((prev) => prev + 1); // Incrementa el número de errores
                
            }
        }
    };

    useEffect(() => {
        if (errorCount >= 6) {
            SetSecretWord(selectedWord); // Muestra la palabra secreta
            setInputDisabled(true); // Deshabilita el input
        }
    }, [errorCount, selectedWord]);

    useEffect(()=>{
        const key = setInterval(()=>{
          setCount(count=>count+1)
        },1000);
  
      return()=>{
        clearInterval(key);
      };
    },[])

    // Función para reiniciar el juego
const restartGame = () => {
    const newCategory = selectRandomCategory();
    setSelectedCategory(newCategory); // Selecciona una nueva categoría
    setInputDisabled(false); // Habilita el input

    // Selecciona una palabra aleatoria de la categoría seleccionada
    switch (newCategory) {
        case "food":
            setSelectedWord(food[Math.floor(Math.random() * food.length)]);
            break;
        case "computers":
            setSelectedWord(computers[Math.floor(Math.random() * computers.length)]);
            break;
        case "mexicanFood":
            setSelectedWord(mexicanFood[Math.floor(Math.random() * mexicanFood.length)]);
            break;
        default:
            setSelectedWord(""); // Por si acaso
            break;
    }

    // Reinicia las letras adivinadas y el contador de errores
    setGuessedLetters([]);
    setErrorCount(0);
    SetSecretWord(""); // Reinicia la palabra secreta
    setCount(0); // Reinicia el tiempo transcurrido

};


    // Renderización del componente
    return (
        <div className="hangman-container">
            <div className="clock">
                Tiempo transcurrido: {count} segundos
            </div>
            <p className="hangman-category">{selectedCategory && `Categoría: ${selectedCategory}`}</p> {/* Muestra la categoría seleccionada */}
            <p className="hangman-word">{displayWord.join('')}</p> {/* Muestra la palabra a adivinar */}
            <input
                id="InputLetters"
                maxLength={1}
                onChange={(e) => handleGuess(e.target.value)} // Maneja las conjeturas del jugador
                disabled={errorCount > 5 || inputDisabled} // Deshabilita el input si hay más de 5 errores o si inputDisabled es verdadero
            />
            {(displayWord.join('') === selectedWord || errorCount > 5) && (
                <button className="hangman-restart-button" onClick={() => {
                    restartGame();
                }}>Seleccionar nueva palabra</button>
            )}
            <p>Cantidad de errores: {errorCount}</p> {/* Muestra la cantidad de errores */}
            {displayWord.join('') === selectedWord && (
                <p className="hangman-message">Ganaste esta ronda</p> // Muestra un mensaje de victoria si se adivina la palabra
            )}
                        {SecretWord && <p className="hangman-message">La palabra era: {SecretWord}</p>}
        </div>
    );
}

export default Hangman;
