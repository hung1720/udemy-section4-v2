import { Text, View, StyleSheet } from 'react-native'
import Title from '../components/ui/Title'
import { useState } from 'react';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';

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

function GameScreen({ userNumber }) {
    const initialGuess = generateRandomBetween(mindBoudary, maxboundary, userNumber) // Nhận một số ngẫu nhiên khi gọi hàm generateRandomBetween
    const [currentGuess, setCurrentGuess] = useState(initialGuess); // useState nhận initialGuess làm số mặc định

    function nextGuessHandler(direction) {
        if(direction == 'lower') {
            maxboundary = currentGuess;
            const newRndNumber = generateRandomBetween(mindBoudary, maxboundary, currentGuess);
        } else {
            mindBoudary = currentGuess + 1;
        }
        const newRndNumber = generateRandomBetween(mindBoudary, maxboundary, currentGuess);
        setCurrentGuess(newRndNumber)
    }

    return <View style={styles.screen}>
        <Title>Opponent's Guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
        <View>
            <Text>Higher or lower?</Text>
            <View>
                <PrimaryButton onPress={nextGuessHandler}>+</PrimaryButton> 
                <PrimaryButton onPress={nextGuessHandler}>-</PrimaryButton>
            </View>
        </View>
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

})