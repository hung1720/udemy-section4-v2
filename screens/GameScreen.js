import { Text, View, StyleSheet, Alert } from 'react-native'
import Title from '../components/ui/Title'
import { useEffect, useState } from 'react';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from "../components/ui/instructionText";


function generateRandomBetween(min, max, exclude) { // Tạo ra một số ngẫu nhiên 
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let mindBoudary = 1;
let maxboundary = 100;

function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(1, 100, userNumber) // Nhận một số ngẫu nhiên khi gọi hàm generateRandomBetween
    const [currentGuess, setCurrentGuess] = useState(initialGuess); // useState nhận initialGuess làm số mặc định

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver();
        }
    }, [currentGuess, userNumber, onGameOver])

    function nextGuessHandler(direction) {
        if (
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)
        ) {
            Alert.alert("Don't lie!", 'You know that this is wrong...', [{ text: 'Sorry', style: 'cancel' }])
            return;
        }
        if (direction === 'lower') {
            maxboundary = currentGuess;
        } else {
            mindBoudary = currentGuess + 1;
        }
        console.log(mindBoudary, maxboundary)
        const newRndNumber = generateRandomBetween(mindBoudary, maxboundary, currentGuess);
        setCurrentGuess(newRndNumber)
    }

    return <View style={styles.screen}>
        <Title>Opponent's Guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstructionText>Higher or lower?</InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>-</PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>+</PrimaryButton>

                </View>
            </View>
        </Card>
        <View>
            {/* <View>LOG ROUNDS</View> */}
        </View>
    </View>
}

export default GameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    }
})