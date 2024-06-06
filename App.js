import { useState } from 'react';

import {
  Text,
  View, 
  TextInput, 
  StyleSheet,
  TouchableOpacity, 
  Image,
} from 'react-native';

// Import Speech from expo-speech
import * as Speech from 'expo-speech';


export default function App() {
  const [initialLanguage, setInitialLanguage] = useState('English');
  const [targetLanguage, setTargetLanguage] = useState('French');
  const [initialText, setInitialText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  /* Create a state for 'pronunciation'*/
  const [pronunciation, setPronunciation] = useState('');

  const languages = ["English", "French", "Portuguese", "German", "Spanish"];

  const initialLanguageButtons = languages.map((language)=>
      <TouchableOpacity style={styles.languageButton}
                        onPress={() => setInitialLanguage(language)}>
          <Image
              source={{
                uri: 'https://procodingclass.github.io/TranslatorApp-Tynker-Module7/'+language+'.png'}}
              style={styles.image}
            />
          <Text style={styles.languageName}>{language}</Text>
      </TouchableOpacity>
  )

  const getTranslation = (language) => {
    setTargetLanguage(language);

    url =
      'https://pro-transltor.onrender.com/?text=' +
      initialText +
      '&srcLang=' +
      initialLanguage +
      '&destLang=' +
      language;
    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setTranslatedText(json.phrase + '\n' + json.pronunciation);

        // Update the value of state 'pronunciation'.
        setPronunciation(json.pronunciation);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* Define speak() function to read the pronunciation in the translated language */
  const speak = () => {
    Speech.speak(pronunciation, {
      language: targetLanguage,
    });
  };

  const targetLanguageButtons = languages.map((language)=>
      <TouchableOpacity style={styles.languageButton}
                        onPress={() => getTranslation(language)}>
          <Image
              source={{
                uri: 'https://procodingclass.github.io/TranslatorApp-Tynker-Module7/'+language+'.png'}}
              style={styles.image}
            />
          <Text style={styles.languageName}>{language}</Text>
      </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Text style={styles.headerText}>Translate</Text>
      </View>
      
      <View style={styles.lowerContainer}>
        <View style={styles.languageContainer}>
          {initialLanguageButtons}
        </View>
      </View>
      
      <View style={styles.middleContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.flagContainer}>            
            <Image
              style={styles.image}
              source={{
                uri:
                  'https://procodingclass.github.io/TranslatorApp-Tynker-Module7/' +
                  initialLanguage +
                  '.png',
                }}
            />
            <Text style={styles.selectedLanguage}>{initialLanguage}</Text>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Type here to translate!"
            multiline={true}
            numberOfLines={4}
            onChangeText={setInitialText}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <View style={styles.flagContainer}>
            <Image
              style={styles.image}
              source={{
                uri:
                  'https://procodingclass.github.io/TranslatorApp-Tynker-Module7/'+
                  targetLanguage+
                  '.png',
                }}
            />
            <Text style={styles.selectedLanguage}>{targetLanguage}</Text>

            {/* Call speak() function when the speaker button is pressed. */}
            <TouchableOpacity
              style={styles.languageButton}
              onPress={() => speak()}>
              <Image
                source={{
                  uri: 'https://procodingclass.github.io/TranslatorApp-Tynker-Module7/speakerIcon.png',
                }}
                style={styles.speaker}
              />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.textInput}
            multiline={true}
            editable={false}
            numberOfLines={4}
            value={translatedText}
          />
        </View>
      </View>
      
      <View style={styles.lowerContainer}>
        <View style={styles.languageContainer}>
          {targetLanguageButtons}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 100,
  },
  upperContainer: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f6fe5',
  },
  headerText: {
    fontSize: 30,
    color: '#ffffff',
    paddingBottom: 10,
  },
  middleContainer: {
    flex: 60,
  },
  inputContainer: {
    flex: 50,
    paddingHorizontal: '5%',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    borderRadius: 10,
    padding: 10,
    boxShadow: `0px 1px 3px #333333`,
  },
  flagContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  image: {
    height: 26,
    width: 26,
    borderRadius: 13,
  },
  selectedLanguage: {
    fontWeight: 'bold',
    color: 'navy',
    paddingBottom: '2%',
    paddingLeft: '4%',
  },
  lowerContainer: {
    flex: 20,
    justifyContent: 'space-evenly',
  },
  languageContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-evenly'
  },
  languageButton: { 
    alignItems: 'center' 
  },
  languageName: { 
    fontWeight: 'bold', 
    color: 'navy' 
  },
  speaker: {
    height: 20,
    width: 20,
    borderRadius: 13,
    marginLeft: 40,
  },
});
