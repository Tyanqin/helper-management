import './App.less';
import React from "react";
import router from './router'
import {useRoutes} from 'react-router-dom'

export default function App() {
    const element = useRoutes(router)
  return (
    <div className="App">
        {element}
    </div>
  );
}

