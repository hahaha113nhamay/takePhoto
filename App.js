import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native'
import Actionsheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';

const width = Dimensions.get('window').width;

const App = () => {
  const [listData, setListData] = useState([]);
  let actionSheetRef = useRef();
  let pickOptions = [
    'Chụp ảnh', 'Chọn từ thư viện', 'Hủy bỏ'
  ]

  const renderItem = ({ item, idex }) => {
    let { itemViewImage, itemImage } = styles;
    return (
      <View style={itemViewImage}>
        <Image source={{uri: item.path}} style={itemImage} resizeMode='cover' />
      </View>
    )
  };

  const onClickAddImage = () => {
    actionSheetRef.current?.show();
  }

  const onSelectedOption = (index) => {
    console.log('vu moi chon index', index);
    if (index === 0) {
      ImagePicker.openCamera({
        compressImageMaxWidth: 500,
        compressImageMaxHeight: 500,
        compressImageQuality: 0.7,
        cropping: true,
      }).then(image => {
        console.log(image);
        setListData([image, ...listData]);
      });
    }
    if (index === 1) {
      ImagePicker.openPicker({
        compressImageMaxWidth: 500,
        compressImageMaxHeight: 500,
        compressImageQuality: 0.7,
        cropping: true
      }).then(image => {
        console.log(image);
        setListData([image, ...listData]);
      });
      // 1. chon anh tu thu vien
      // 2. chon anh xong thi goi setListData([ <data anh moi>, ...listData])

    }
  }

  return <View style={styles.content}>
    <Text>Add image</Text>
    <FlatList
      data={listData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />

    <TouchableOpacity onPress={onClickAddImage} style={styles.btnPressStyle}>
      <Text style={styles.txtStyle}>press add image</Text>
    </TouchableOpacity>
    <Actionsheet
      ref={actionSheetRef} title='che do chup anh' options={pickOptions} cancelButtonIndex={2} onPress={onSelectedOption} />
  </View>
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 30
  },
  btnPressStyle: {
    backgroundColor: '#0080ff',
    height: 50,
    width: width - 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtStyle: {
    color: '#ffffff'
  },
  itemImage: {
    backgroundColor: '#2F455C',
    height: 150,
    width: width - 60,
    borderRadius: 8,
    resizeMode: 'contain'
  },
  itemViewImage: {
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,

  }
});

export default App;