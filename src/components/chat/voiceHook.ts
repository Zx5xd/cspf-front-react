import { useEffect, useRef, useState } from 'react';
import { io, Socket } from "socket.io-client";
import { migHost } from "../../util/apiInof.ts";

const configuration = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

const voiceHook = (roomId: string | undefined) => {
    const localStream = useRef<MediaStream | null>(null);
    const peerConnection = useRef<RTCPeerConnection | null>(null);
    const wsRef = useRef<Socket | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [open, setOpen] = useState<boolean>(false);
    const cspfDev = migHost();

    const handleSignal = async (data: any) => {
        console.log('Received signal:', data);
        try {
            if (data.signal && typeof data.signal === 'object') {
                const { type, sdp, candidate } = data.signal;
                if (type && sdp) {
                    const remoteDescription = new RTCSessionDescription(data.signal);
                    await peerConnection.current?.setRemoteDescription(remoteDescription);

                    if (type === 'offer') {
                        const answer = await peerConnection.current?.createAnswer();
                        await peerConnection.current?.setLocalDescription(answer);
                        wsRef.current?.emit('signal', { signal: answer, room: `${roomId}_voiceRoom`, from: wsRef.current?.id });
                    }
                } else if (candidate) {
                    await peerConnection.current?.addIceCandidate(new RTCIceCandidate(data.signal));
                }
            } else {
                console.error('Invalid signal data received:', data);
            }
        } catch (error) {
            console.error('Failed to handle signal:', error);
        }
    };

    useEffect(() => {
        if (open) {
            console.log('open, ', open)
            wsRef.current = io(cspfDev, {
                query: {roomId},
                withCredentials: true,
            });

            console.log('Voice wsRef.current', wsRef.current);
            // wsRef.current?.emit('signal','signal 통신 확인')
            wsRef.current?.on('signal', handleSignal);

            navigator.mediaDevices.getUserMedia({
                audio: {
                    sampleRate: 44100,
                    channelCount: 1,
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                },
            }).then(stream => {
                console.log('getUserMedia', stream);
                localStream.current = stream;
                peerConnection.current = new RTCPeerConnection(configuration);
                stream.getTracks().forEach(track => peerConnection.current?.addTrack(track, stream));

                peerConnection.current.onicecandidate = event => {
                    if (event.candidate) {
                        wsRef.current?.emit('signal', { signal: event.candidate, room: `${roomId}_voiceRoom`, from: wsRef.current?.id });
                    }
                };

                peerConnection.current.ontrack = event => {
                    if (!audioRef.current) {
                        audioRef.current = document.createElement('audio');
                        audioRef.current.autoplay = true;
                        document.body.appendChild(audioRef.current);
                    }
                    audioRef.current.srcObject = event.streams[0];
                };

                peerConnection.current.createOffer().then(offer => {
                    peerConnection.current?.setLocalDescription(offer);
                    wsRef.current?.emit('signal', { signal: offer, room: `${roomId}_voiceRoom`, from: wsRef.current?.id });
                });
            }).catch(error => {
                console.error('Error accessing media devices', error);
            });
        }

        return () => {
            endVoice();
        };
    }, [open, roomId]);

    const startVoice = () => {
        setOpen(true);
    };

    const endVoice = () => {
        peerConnection.current?.close();
        peerConnection.current = null;

        if (localStream.current) {
            localStream.current.getTracks().forEach(track => track.stop());
            localStream.current = null;
        }

        wsRef.current?.disconnect();
        wsRef.current = null;

        if (audioRef.current) {
            document.body.removeChild(audioRef.current);
            audioRef.current = null;
        }

        setOpen(false);
    };

    return { startVoice, endVoice };
};

export default voiceHook;
