import React, { useState, useEffect, FC } from "react";
import { NoiseSynth } from "tone";
import * as Tone from 'tone'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import StartAudioContext from "startaudiocontext";
import './noiseEditorStyles.css'
import { CButton, CCard, CCardBody, CCardHeader, CCardTitle, CCol, CFormRange, CInputGroup, CInputGroupText, CListGroup, CListGroupItem } from "@coreui/react";
import CIcon from '@coreui/icons-react';
import { cilDelete } from '@coreui/icons'

type Props = {
  id: string;
  removeByKey: (keyToDelete: string) => void;
  name: string;
};

// StartAudioContext(Tone.context, document.body).then(
//   startAudioContext()
// )


// StartAudioContext(Tone.context, document.body).then(function() {
//   console.log("audio context started");
// });

export const NoiseEditor: FC<Props> = ({ id, removeByKey, name }) => {

  const [volume, setVolume] = useState(100);
  const [distortion, setDistortion] = useState(0);
  const [delay, setDelay] = useState(0);
  const [reverb, setReverb] = useState(0);
  const [noiseSynth, setNoiseSynth] = useState<any | undefined | null>(null);
  // TODO: figure out if this boolean tag is unnecessary
  const [audioContextStarted, setAudioContextStarted] = useState<boolean | null>(null)
  const [isMuted, setIsMuted] = useState<boolean>(true)

  const startAudioContext = () => {
    console.log("audioContextStarted :" + audioContextStarted)
    if (!audioContextStarted) {
      Tone.start();
      setAudioContextStarted(true)
    }
  }

  useEffect(() => {
    
      setNoiseSynth(
        new NoiseSynth({
          noise: {
            type: "brown"
          },
          envelope: {
            attack: 0.005,
            decay: 0.1,
            sustain: 0.005
          }
        })
      );
  }, [audioContextStarted]);

  useEffect(() => {
    if (noiseSynth) {
      noiseSynth.volume.value = volume / 100;
    }
  }, [volume, noiseSynth]);

  useEffect(() => {
    if (noiseSynth) {
      noiseSynth.distortion = distortion;
    }
  }, [distortion, noiseSynth]);

  useEffect(() => {
    if (noiseSynth) {
      // TO DO: this below is currently just a guess at the right noiseSynth syntax. need to double-check this. But it's not a priority, as it's outside the learning goals. 
      noiseSynth.delay = delay;
    }
  }, [delay, noiseSynth]);

  useEffect(() => {
    if (noiseSynth) {
      // TO DO: this below is currently just a guess at the right noiseSynth syntax. need to double-check this. But it's not a priority, as it's outside the learning goals. 
      noiseSynth.reverb = reverb;
    }
  }, [reverb, noiseSynth])

  return (
    <CCol xs>
      <CCard 
        color='dark'
        textColor='white'
        style={{
          maxWidth: '350px',
          minWidth: '150px',
          margin: '10px',
          display: 'inline-block'
        }} 
      >
        <CCardBody>
          <CCardHeader component="h5">{name}</CCardHeader>
          {/* TODO: make these two buttons never bunch up into two rows, at any viewport width */}
          <CButton style={{ margin: '10px'}} color='success' onClick={() => noiseSynth.triggerAttack()}>Start noise</CButton>
          <CButton style={{margin: '10px'}} onClick={() => noiseSynth.triggerRelease()}>Stop noise</CButton>
          <CListGroup>
            <CListGroupItem color='dark'>
              <CInputGroup className="mb-0 justify-content-center">
                <CInputGroupText component="label" htmlFor="volume-slider">
                  Volume: {volume}
                </CInputGroupText>
                <CFormRange
                  id="volume-slider"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={e =>
                    setVolume(parseInt(e.target.value))}
                />
              </CInputGroup>
            </CListGroupItem>
            <CListGroupItem color='dark'>
              <CInputGroup className="mb-0 justify-content-center">
                <CInputGroupText component="label" htmlFor="distortion-slider">
                  Distortion: {distortion}
                </CInputGroupText>
                <CFormRange
                  id="distortion-slider"
                  min={0}
                  max={100}
                  value={distortion}
                  onChange={e =>
                    setDistortion(parseInt(e.target.value))}
                />
              </CInputGroup>
            </CListGroupItem>
            <CListGroupItem color='dark'>
              <CInputGroup className="mb-0 justify-content-center">
                <CInputGroupText component="label" htmlFor="delay-slider">
                  Delay: {delay}
                </CInputGroupText>
                <CFormRange
                  id="delay-slider"
                  min={0}
                  max={100}
                  value={delay}
                  onChange={e => 
                    setDelay(parseInt(e.target.value))
                  }
                />
              </CInputGroup>
            </CListGroupItem>
            <CListGroupItem color='dark'>
              <CInputGroup className="mb-0 justify-content-center">
                <CInputGroupText htmlFor="reverb-slider">
                  Reverb: {reverb}
                </CInputGroupText>
                <CFormRange
                  id="reverb-slider"
                  min={0}
                  max={100}
                  value={reverb}
                  onChange={e => {
                    setReverb(parseInt(e.target.value, 10))
                  }}
                />
              </CInputGroup>
            </CListGroupItem>
            <CListGroupItem color='dark'>
              <BootstrapSwitchButton
                checked={false}
                onstyle="dark"
                onlabel='Muted'
                offlabel='Unmuted'
                width={120}
                onChange={(checked) => {
                  setIsMuted(!checked)
                  console.log("isMuted :" + isMuted)
                }}
              />
            </CListGroupItem>
          </CListGroup>
          
          <br />
          
          <CButton id="delete-button" className='mb-0' color='danger' onClick={() => removeByKey(id)}>
            <CIcon className="icon" icon={cilDelete} size='sm'/>
            <span>Delete</span>
          </CButton>
          <br />
          <CButton color="secondary" onClick={startAudioContext}>Start Audio Context</CButton>
        </CCardBody>
      </CCard>
    </CCol>
  );
};
