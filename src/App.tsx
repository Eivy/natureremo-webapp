import { onMount } from 'solid-js';
import { Router, Route } from '@solidjs/router';
import './App.scss';
import { setDevices, setAppliances } from './store';
import Top from './pages/Top';
import Config from './pages/Config';
import Buttons from './pages/Buttons';
import { Gear } from './components/Icons';
import Api from './Api';

function Header() {
  return (
    <header>
      <a href="/natureremo-webapp/" class="logo">RemoWebApp</a>
      <a href="/natureremo-webapp/config" class="config"><Gear /></a>
    </header>
  );
}

function AppLayout(props: { children?: any }) {
  onMount(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      return;
    }
    Api.setToken(token);
    Api.GetDevices().then((v) => {
      if (v) {
        setDevices(v);
      }
    });
    Api.GetAppliances().then((v) => {
      if (v) {
        setAppliances(v);
      }
    });
  });

  return (
    <>
      <Header />
      <div id="main">
        {props.children}
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router base="/natureremo-webapp" root={AppLayout}>
      <Route path="/appliances/:id" component={Buttons} />
      <Route path="/config" component={Config} />
      <Route path="/" component={Top} />
    </Router>
  );
}
