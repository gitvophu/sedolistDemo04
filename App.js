/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import RNTesseractOcr from 'react-native-tesseract-ocr';
// import * as RNFS from 'react-native-fs';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import {speak,test,stopSpeak} from './src/modules/Tts';
const App = () => {


  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const [avatarSource,setAvatarSource] = useState(null);
  const [content,setContent] = useState('');
  var loadImage = ()=>{
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log(response.uri)
        const imgPath = response.path;
        loadTextFromImage(imgPath);
        setAvatarSource(source);
      }
    });
  }
  const loadTextFromImage = (imgPath)=>{
    const tessOptions = {
      whitelist: null, 
      blacklist: '1234567890\'!"#$%&/()={}[]+*-_:;<>'
    };
    // const imgPath = '';
    console.log(imgPath);
    // img = require('./src/assets/img/text-img.png');
    // console.log(img);
    const lang = 'LANG_ENGLISH';
    RNTesseractOcr.recognize(imgPath, lang, tessOptions)
      .then((result) => {
        // this.setState({ ocrResult: result });
        console.log("OCR Result: ", result);
        setContent(result);
      })
      .catch((err) => {
        console.log("OCR Error: ", err);
      })
      .done();
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DEMO ĐỌC TEXT TỪ HÌNH ẢNH</Text>
      <Text>Hướng dẫn: </Text>
      <Text>- Hãy bấm {`<Chọn ảnh>`} để load ảnh cần load text => Sau khi chọn xong, các text tìm thấy sẽ hiển thị phía dưới</Text>
      <Text>- Hãy bấm {`<Đọc text thành tiếng>`} để nghe âm thanh chuyển đổi từ text</Text>
      <Text>Lưu ý là chọn ảnh có text tiếng Anh nhé. Vì mặc định giọng đọc tiếng Anh</Text>
      <View style={styles.btnLoad}>
        <Button  title="Chọn ảnh" onPress={()=>loadImage()}/>
      </View>
      <View style={styles.btnLoad}>
        <Button  title="Đọc text thành tiếng" onPress={()=>speak(content)}/>
      </View>
      <View style={styles.btnLoad}>
        <Button  title="Dừng Đọc" onPress={()=>stopSpeak()}/>
      </View>
      <Text>Nội dung đọc được: </Text>
      <Text style={styles.content}>{content}</Text>
    </View>

  );
};
const styles = StyleSheet.create({
  container:{
    margin:15
  },
  title:{
    color:'red',
    fontSize:18,
    margin:10,
    alignSelf:'center'
  },
  btnLoad:{
    marginVertical:5,
  },
  content: {
    color:"blue"
  }
})

export default App;
