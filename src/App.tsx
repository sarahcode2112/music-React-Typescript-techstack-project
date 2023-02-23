
import './App.css';
import './NoiseEditor'
import { NoiseEditor } from './NoiseEditor';
import { Navbar } from './Navbar';
import { useState } from 'react';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CButton, CCard, CRow } from '@coreui/react'
import './noiseEditorStyles.css'

const initialNoiseEditor: {
  id: string;
  name: string;
}[] = [
  {
    id: 'a',
    name: 'Noise Editor'
  },
]


const App = () => {

  const [noiseEditors, setNoiseEditors] = useState(initialNoiseEditor)
  
  const addNoiseEditor = () => {
    const newNoiseEditorsList: {
      id: string;
      name: string;
  }[] = noiseEditors.concat({ name: "Noise Editor", id: uuidv4() })
    setNoiseEditors(newNoiseEditorsList);
  }

  const removeByKey = (KeyToDelete: string) => {
    setNoiseEditors(noiseEditors => noiseEditors.filter((
      noiseEditor
    ) => noiseEditor.id !== KeyToDelete));
  };

  return (
    <div className="App">
      <Navbar></Navbar>

      <CRow xs={{ cols: 1, gutter: 4 }} sm={{cols: 2}} md={{cols: 3}}>
        {noiseEditors.map((noiseEditor) =>
          <NoiseEditor key={noiseEditor.id} id={noiseEditor.id} name={noiseEditor.name} removeByKey={removeByKey} />
        )}
        {/* TODO: remove border of add noise editor button */}
        <CCard id="add-noise-button" textColor={'success'}
          onClick={addNoiseEditor}><big>+ Add new noise editor</big>
        </CCard>
      </CRow>
      
    </div>
  );
}

export default App;
