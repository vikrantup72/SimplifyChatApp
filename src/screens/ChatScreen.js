/* eslint-disable prettier/prettier */
/* eslint-disable curly */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Linking,
  StatusBar,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import ScreenHeader from '../components/ScreenHeader';
import {images, WINDOW_HEIGHT} from '../utils';
import {usePopupModal} from '../utils/customHook';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [messageHeights, setMessageHeights] = useState({});
  const [text, setText] = useState('');
  const flatListRef = useRef(null);
  const [isReceiver, setReceiver] = useState(false);
  const [isInternet, setInternet] = useState(true);

  const {showModal, hideModal, ModalComponent} = usePopupModal();

  const onSwitch = () => {
    setReceiver(!isReceiver);
    hideModal();
    flatListRef.current.scrollToEnd({animated: true, index: 0});
  };
  const calculateMessageHeight = (index, height) => {
    setMessageHeights(prevHeights => ({
      ...prevHeights,
      [index]: height || 87.2727279663086,
    }));
  };
  const getItemLayout = (data, index) => {
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += messageHeights[i] || 87.2727279663086;
    }
    // If the height for the current index is not available, use a default height
    const currentHeight = messageHeights[index] || 87.2727279663086;

    return {
      length: currentHeight,
      offset,
      index,
    };
  };

  const addMessage = async () => {
    if (text.trim() === '') {
      return;
    }
    setText('');
    const currentDate = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      day: 'numeric',
      month: 'short',
    }).format(currentDate);
    setMessages([
      ...messages,
      {
        text,
        id: messages.length,
        isSuccess: isInternet ? true : false,
        date: formattedDate,
      },
    ]);
    flatListRef.current.scrollToEnd({animated: true, index: 0});
  };

  const renderClickableText = text => {
    const parts = text.split(' ');
    return parts.map((part, index) => {
      if (part.includes('https://')) {
        return (
          <Text
            key={index}
            style={styles.linkText}
            onPress={() => Linking.openURL(part)}>
            {part}
          </Text>
        );
      } else {
        return (
          <Text
            key={index}
            style={{color: '#fff', fontSize: 12, fontWeight: '300'}}>
            {part + ` `}
          </Text>
        );
      }
    });
  };

  const InfoModal = () => {
    return (
      <LinearGradient
        colors={['#FFF', 'purple']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.modalWrapper}>
        <Text onPress={() => onSwitch()} style={styles.modalText}>
          {`Switch to ${isReceiver ? 'Sender' : 'Receiver'}`}
        </Text>
        <View
          style={{width: '100%', borderWidth: 0.5, borderColor: '#4b1380'}}
        />
        <Text
          onPress={() => {
            setInternet(!isInternet);
            hideModal();
          }}
          style={styles.modalText}>
          {isInternet ? `Disable Internet` : `Enable Internet`}
        </Text>
        <View
          style={{width: '100%', borderWidth: 0.5, borderColor: '#4b1380'}}
        />
        <Text onPress={hideModal} style={styles.modalText}>
          Close
        </Text>
      </LinearGradient>
    );
  };

  const render = (item, index) => {
    return (
      <View
        style={{flex: 1}}
        onLayout={event =>
          calculateMessageHeight(index, event.nativeEvent.layout.height)
        }>
        <LinearGradient
          colors={['#4b1380', 'transparent']}
          start={{x: !isReceiver ? 0 : 1, y: 0}}
          end={{x: !isReceiver ? 1 : 0, y: 0}}
          style={styles.message(isReceiver)}>
          <View style={styles.contentWrapper}>
            <Text style={styles.userName}>{`@` + 'Vikrantup72'}</Text>

            <Text style={styles.date}>{item.date}</Text>
          </View>
          <View style={styles.seperator} />
          <View style={styles.isSuccessWrapper}>
            {renderClickableText(item.text)}
          </View>
          {item?.isSuccess && !isReceiver && (
            <Image
              source={images.delivered}
              style={styles.delivered}
              resizeMode="cover"
            />
          )}
        </LinearGradient>
        {!item.isSuccess && !isReceiver && (
          <View style={styles.errorWrapper}>
            <Text style={styles.errorText}>Not sent. Tap to try again </Text>
            <Image
              source={images.error}
              style={styles.error}
              resizeMode="cover"
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      <StatusBar animated={true} backgroundColor={'#4b1380'} />
      <SafeAreaView style={styles.activityWrapper}>
        <LinearGradient
          colors={['#4b1380', 'purple']}
          start={{x: !isReceiver ? 0 : 1, y: 0}}
          end={{x: !isReceiver ? 1 : 0, y: 0}}
          style={{flex: 1}}>
          <ScreenHeader label={'Chat'} back={true} onPress={showModal} />
          <ModalComponent>{InfoModal()}</ModalComponent>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 1}
            style={styles.container}>
            <FlatList
              ref={flatListRef}
              data={messages}
              contentContainerStyle={{flexDirection: 'column'}}
              showsVerticalScrollIndicator={false}
              getItemLayout={getItemLayout}
              keyExtractor={item => item.id.toString()}
              renderItem={({item, index}) => render(item, index)}
            />

            {!isReceiver && (
              <View style={styles.inputContainer}>
                <LinearGradient
                  colors={[
                    'purple',
                    text.length > 0 ? '#8622e5' : '#4b1380',
                    '#4b1380',
                  ]}
                  start={{x: 1, y: 0}}
                  end={{x: 0, y: 0}}
                  style={styles.textInput}>
                  <TextInput
                    style={styles.input(text.length > 0 ? true : false)}
                    value={text}
                    onChangeText={newText => setText(newText)}
                    placeholder="Type a message..."
                    placeholderTextColor={'#ddd'}
                    onSubmitEditing={addMessage}
                  />
                </LinearGradient>

                {text.length > 0 ? (
                  <TouchableOpacity onPress={addMessage}>
                    <Image
                      source={images.sendMsg}
                      style={{width: 45, height: 44}}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity activeOpacity={1}>
                    <Image
                      blurRadius={2.5}
                      source={images.sendMsg}
                      style={{width: 45, height: 44}}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </KeyboardAvoidingView>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  activityWrapper: {
    flex: 1,
    backgroundColor: '#0B0014',
  },
  containerBackground: {
    flex: 1,
  },
  headerBar: {
    height: 60,
    paddingLeft: 20,
  },
  wrapper: {
    position: 'absolute',
    backgroundColor: '#00000099',
    zIndex: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  message: isReceiver => ({
    flex: 1,
    maxWidth: '90%',
    minWidth: '50%',
    padding: 8,
    marginVertical: 4,
    borderRadius: 8,
    alignSelf: !isReceiver ? 'flex-end' : 'flex-start', // Align messages to the left by default
  }),
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  input: flag => ({
    flex: 1,
    padding: 8,
    paddingLeft: 16,
    borderRadius: 100,
    color: '#fff',
  }),
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkText: {
    color: '#87CEEB',
    fontSize: 12,
    fontWeight: '300',
    textDecorationLine: 'underline',
    marginRight: 3,
  },
  textInput: {
    borderRadius: 20,
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#4b1380',
  },
  error: {
    alignSelf: 'flex-end',
    width: 12,
    height: 12,
    tintColor: '#FFF',
  },
  errorText: {
    color: 'rgba(255, 255, 255,1)',
    textAlign: 'right',
    fontSize: 10,
  },
  errorWrapper: {flexDirection: 'row', alignSelf: 'flex-end'},
  delivered: {alignSelf: 'flex-end', tintColor: '#fff'},
  isSuccessWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 6,
  },
  seperator: {
    flex: 0.0001,
    height: 0.3,
    backgroundColor: '#9a38ee',
  },
  date: {
    color: '#fff',
    textAlign: 'right',
    fontSize: 8,
  },
  userName: {
    color: '#fff',
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '600',
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
    alignItems: 'center',
  },
  modalText: {
    color: '#4b1380',
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 1,
    padding: 12,
  },
  modalWrapper: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 20,
    right: 10,
    top: 60,
  },
});
