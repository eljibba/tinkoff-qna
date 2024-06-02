import { create } from 'zustand';
import { produce } from 'immer';

import axiosInstance from '@chrome-extension-boilerplate/shared/api/axiosInstance';
import { MessageType } from '../types';

// const url = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';

interface ChatStoreState {
  messages: MessageType[];
  isLoading: boolean;
  sendMessage: (text: string) => Promise<string | false>; // Explicit return type
  likeMessage: (index: number, value: boolean | null) => void;
}

export const useChatStore = create<ChatStoreState>(
  (set) => ({
    messages: [],
    isLoading: false,

    sendMessage: async (text) => {
      set(
        produce((state: ChatStoreState) => {
          state.messages.push({ text, owner: 'me', like: null });
          state.isLoading = true;
        })
      );

      const data = {
        query: text
      };

      // const data = {
      //   "contents": [
      //     {
      //       "role": "user",
      //       "parts": [
      //         {"text": text}
      //       ]
      //     }
      //   ]
      // };

      const config = {
        // params: {
        //   "key": "AIzaSyC7zHMG7s0WndaXuSiyHh3P5TwaunPGCsE",
        // },
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
      };

      const res = await axiosInstance.post('http://51.250.103.4:8081/assist', data, config).then((res) => {
        if (res.data) {
          set(
            produce((state: ChatStoreState) => {
              // state.messages.push({ text: res.data.candidates[0]?.content.parts[0].text, owner: 'assistant' });
              state.messages.push({ text: res.data.text, owner: 'assistant' });
              state.isLoading = false;
            })
          );
        }
        return res.data;
      }).catch(() => {
        set(
          produce((state: ChatStoreState) => {
            state.isLoading = false;
          })
        )
        return false;
      });
      return res;
    },
    likeMessage: (index, value) => {
      set(
        produce((state: ChatStoreState) => {
          state.messages[index].like = value
        })
      )
    },
  }),
);
