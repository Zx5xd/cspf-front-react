import {useEffect, useRef, useState} from 'react';
import {io, Socket} from "socket.io-client";
import {migHost} from "../../util/apiInof.ts";

const configuration = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

const voiceHook = (roomId: string | undefined) => {
    const localStream = useRef<MediaStream | null>(null);
    const peerConnection = useRef<RTCPeerConnection | null>(null);
    const wsRef = useRef<Socket | null>(null);

    const [open, setOpen] = useState<boolean>(false);

    const cspfDev = migHost()
        // import.meta.env.VITE_DEV_CSPF_HOST;

    // WebSocket 훅 사용
   const handleSignal = async (data: any) => {
       // console.log('Received signal:', data);

       if (data.signal && typeof data.signal === 'object' && data.signal.type && data.signal.sdp) {
           try {
               const remoteDescription = new RTCSessionDescription(data.signal);
               await peerConnection.current?.setRemoteDescription(remoteDescription);

               if (data.signal.type === 'offer') {
                   const answer = await peerConnection.current?.createAnswer();
                   await peerConnection.current?.setLocalDescription(answer);
                   wsRef.current?.emit('signal', {signal: answer, room: roomId+'_voice', from: wsRef.current.id});
               }
           } catch (error) {
               console.error('Failed to set remote description:', error);
           }
       } else if (data.signal && data.signal.candidate) {
           try {
               await peerConnection.current?.addIceCandidate(new RTCIceCandidate(data.signal));
           } catch (error) {
               console.error('Error adding ICE candidate:', error);
           }
       } else {
           console.error('Invalid signal data received:', data);
       }
   }

    useEffect(() => {

        if(open){
            wsRef.current = io(cspfDev, {
                query: { roomId },
                withCredentials: true,
            });

            wsRef.current?.on('signal', handleSignal);

            // 로컬 미디어 스트림 설정 및 WebRTC 연결 초기화
            navigator.mediaDevices.getUserMedia({ audio: {
                    sampleRate: 44100,       // 높은 샘플레이트 사용 (일반적으로 44.1kHz 또는 48kHz)
                    channelCount: 1,         // 스테레오 설정 (일반적인 음성 통화는 1, 음악은 2)
                    echoCancellation: true,  // 에코 제거 활성화
                    noiseSuppression: true,  // 소음 제거 활성화
                    autoGainControl: true    // 자동 이득 조절 활성화
                } }).then(stream => {
                localStream.current = stream;
                peerConnection.current = new RTCPeerConnection(configuration);
                stream.getTracks().forEach(track => peerConnection.current?.addTrack(track, stream));

                peerConnection.current.onicecandidate = (event) => {
                    if (event.candidate) {
                        wsRef.current?.emit('signal', { signal: event.candidate, room: 'voice_chat_room', from: wsRef.current.id });
                    }
                };

                peerConnection.current.ontrack = (event) => {
                    const audioElement = document.createElement('audio');
                    audioElement.srcObject = event.streams[0];
                    audioElement.autoplay = true;
                    document.body.appendChild(audioElement);
                };

                peerConnection.current.createOffer().then(offer => {
                    peerConnection.current?.setLocalDescription(offer);
                    wsRef.current?.emit('signal', { signal: offer, room: 'voice_chat_room', from: wsRef.current.id });
                });
            }).catch(error => {
                console.error('Error accessing media devices', error);
            });
        }

        return () => {
            endVoice()
        };
    }, [roomId, open]);

    const startVoice = (open:boolean) => {
        setOpen(open)
    }

   const endVoice = () => {
        peerConnection.current?.close();
        peerConnection.current = null;

        if (localStream.current) {
            localStream.current.getTracks().forEach(track => track.stop());
            localStream.current = null;
        }

        wsRef.current?.disconnect()
       wsRef.current = null;

        setOpen(!open)
    }

   return { endVoice, startVoice };
}



export default voiceHook;