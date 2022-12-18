import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import { useState, useEffect } from 'react';
import 'stream-chat-react/dist/css/v2/index.css';
import './layout.css';

// 
const User1 = {
  id: 'Bablu',
  name: 'Bablu',
  image: 'https://getstream.imgix.net/images/random_svg/U.png',
}

const App = () => {
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    async function initChat() {
      const client = new StreamChat('ststr5e9399q');
      const user = User1;
      client.connectUser(user, client.devToken(user.id))
      const channel = client.channel("team", "devTutor", {
        name: "devTutor",
        image: 'https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/af6fc7d7-5ecc-4dd2-a3a2-d08945061fa5',
      })
      await channel.create()
      const state = await channel.watch();
      console.log(state)
      channel.addMembers([user.id])
      setChannel(channel)
      console.log(channel)
      setChatClient(client)
      console.log(client)
    }
    initChat();
    return () => {
      if (chatClient) {
        chatClient.disconnectUser()
      }
    }
  }, [])

  if (!chatClient || !channel) {
    return <></>
  }
  return (
      <Chat client={chatClient} theme='str-chat__theme-light'>
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
  )
};

export default App;
