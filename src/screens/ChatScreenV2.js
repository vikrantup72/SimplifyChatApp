/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import ScreenHeader from '../components/ScreenHeader';

const ChatScreenV2 = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    let data = {
      _id: messages[0]._id,
      text: messages[0].text,
      createdAt: messages[0].createdAt,
      user: {
        _id: 1,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, data));
  }, []);

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'purple',
            maxWidth: '90%',
            marginVertical: 6,
            justifyContent: 'flex-end',
          },
          left: {
            backgroundColor: '#4b1380',
            maxWidth: '90%',
            marginVertical: 6,
            justifyContent: 'flex-start',
          },
        }}
        textStyle={{
          right: {
            color: 'white',
            fontSize: 12,
          },
          left: {
            color: 'white',
            fontSize: 12,
          },
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        colors={['#4b1380', 'purple']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{flex: 1}}>
        <ScreenHeader label={'Chat V2'} back={true} />
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
          renderBubble={renderBubble}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ChatScreenV2;
